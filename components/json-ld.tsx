import { memo } from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = memo(({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, process.env.NODE_ENV === 'development' ? 2 : 0)
      }}
      key={`jsonld-${JSON.stringify(data)}`}
    />
  );
});

JsonLd.displayName = 'JsonLd';

export default JsonLd;
