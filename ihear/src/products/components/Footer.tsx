import React from 'react';
import { Section } from '../../api/types';
import Button from '../../components/Button';
type FooterProps = {
  prevSection: Section;
  onPrev: () => void;
  nextSection: Section;
  onNext: () => void;
};
const Footer: React.SFC<FooterProps> = ({
  prevSection,
  onPrev,
  nextSection,
  onNext
}) => (
  <footer>
    <div className="prev">
      {prevSection && (
        <Button color="dark" size="normal" onClick={onPrev}>
          ❮{'  '}
          {prevSection.name}
        </Button>
      )}
    </div>
    <div className="next">
      {nextSection && (
        <Button color="dark" size="normal" onClick={onNext}>
          {nextSection.name}
          {'  '}❯
        </Button>
      )}
    </div>
    <style jsx>{`
      footer {
        display: flex;
        flex-direction: row;

        justify-content: space-between;
        z-index: 5;
        margin-top: 24px;
        margin-bottom: 12px;
      }
    `}</style>
  </footer>
);

export default Footer;
