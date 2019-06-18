import React from 'react';

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function Image({ src, width, height, alt }: ImageProps) {
  if (!width) {
    throw new Error('Please define the width of the image!');
  }

  if (!height) {
    throw new Error('Please define the height of the image!');
  }

  const aspectRatio = String(height / width) + '%';

  return (
    <figure>
      <main>
        <div style={{ paddingBottom: aspectRatio }}>
          <img src={src} alt={alt} />
        </div>
      </main>
      <style jsx>
        {`
          figure {
            margin: 0;
            text-align: center;
            display: block;
          }
          main {
            margin: 0 auto;
            max-width: 100%;
          }
          img {
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </figure>
  );
}

export default Image;
