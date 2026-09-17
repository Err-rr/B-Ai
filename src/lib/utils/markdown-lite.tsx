import { Fragment } from "react";

/**
 * Renders a small, known subset of markdown - **bold** spans and
 * paragraph breaks - as JSX. The chat fixtures use exactly this much;
 * a full markdown library (remark/react-markdown) would be more
 * machinery than the brief's actual content needs. This is the fix
 * for the brief's literal "**Sparkpath**" bug.
 */
export function renderMarkdownLite(text: string): React.ReactNode {
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((paragraph, pIndex) => (
    <p key={pIndex} className={pIndex > 0 ? "mt-3" : undefined}>
      {paragraph.split("\n").map((line, lIndex, lines) => (
        <Fragment key={lIndex}>
          {renderBoldSpans(line)}
          {lIndex < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  ));
}

function renderBoldSpans(line: string): React.ReactNode {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
