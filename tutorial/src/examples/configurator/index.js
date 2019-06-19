import React from 'react';
import { Section } from './components/Section';
import Example from '../Example';
import Tabs from './components/Tabs';
import configure from '../../api/configure';
import { assign, unassign } from './utils/assignment-utils';
import './index.css';

/**
 * Example of how to use the /configure endpoint to create an interactive
 * configurator.
 *
 * This `<Configurator>` component is the top level component of the interactive
 * configurator. It manages state and pushes state changes from the /configure
 * endpoint down to sub component that renders the configuration result.
 *
 * The interactive configurator has the following structure.
 *
 * +--------------------------------------------------------------------------+
 * | Configurator                                                             |
 * | +----------------------------------------------------------------------+ |
 * | | Tabs                                                                 | |
 * | +----------------------------------------------------------------------+ |
 * | +----------------------------------------------------------------------+ |
 * | | Section                                                              | |
 * | | +------------------------------------------------------------------+ | |
 * | | | VariableLine+                                                    | | |
 * | | | +--------------------------------------------------------------+ | | |
 * | | | | VariableInput                                                | | | |
 * | | | | (Dropdown | TextInput | MultivaluedInput)                    | | | |
 * | | | +--------------------------------------------------------------+ | | |
 * | | +------------------------------------------------------------------+ | |
 * | +------------------------------------------------------------------------
 *
 */
class Configurator extends React.Component {
  assignments = [];

  state = {
    activeTabIndex: 0
  };

  async componentDidMount() {
    this.configure();
  }

  handleActiveTabChange = activeTabIndex => this.setState({ activeTabIndex });

  configure = async assignments => {
    const { productId } = this.props.match.params;
    const packagePath = process.env.REACT_APP_PACKAGE_PATH;

    try {
      const result = await configure({
        packagePath,
        date: new Date(),
        line: {
          productId,
          variableAssignments: assignments
        }
      });

      this.setState({ sections: result.sections, error: null });
    } catch (e) {
      if (e.type === 'CannotLoadPackage') {
        this.setState({
          error: `Product with id '${productId} doesn't exist in package with path '${packagePath}'`
        });
      }
    }
  };

  handleOnAssign = (variableId, value, exclude, multivalued) => {
    const newAssignments = assign(
      this.assignments,
      { variableId, value, exclude },
      multivalued
    );
    this.assignments = newAssignments;
    this.configure(newAssignments);
  };

  handleOnUnassign = (variableId, value, exclude) => {
    const newAssignments = unassign(this.assignments, {
      variableId,
      value,
      exclude
    });
    this.assignments = newAssignments;
    this.configure(newAssignments);
  };

  render() {
    const { productId } = this.props.match.params;
    if (!productId) {
      return (
        <Example>
          <div>
            <p>To start the configurator specify a product id in the URL. </p>
            <p>
              For examples{' '}
              <a href="/configurator/IHEAR">/configurator/IHEAR</a>
            </p>
          </div>
        </Example>
      );
    }

    const { sections, activeTabIndex, error } = this.state;
    if (error) {
      return <Example>{error}</Example>;
    }

    if (!sections) {
      return <Example>Loading…</Example>;
    }
    const activeSection = sections[activeTabIndex];
    return (
      <Example>
        <div className="configurator">
          <Tabs
            tabs={sections.map(section => section.name)}
            onTabChange={this.handleActiveTabChange}
            activeTabIndex={activeTabIndex}
          >
            {activeSection.sections.map(subsection => (
              <Section
                section={subsection}
                key={subsection.id}
                onAssign={this.handleOnAssign}
              />
            ))}
            <Section
              section={{ variables: activeSection.variables }}
              onAssign={this.handleOnAssign}
              onUnassign={this.handleOnUnassign}
            />
          </Tabs>
        </div>
      </Example>
    );
  }
}

export default Configurator;
