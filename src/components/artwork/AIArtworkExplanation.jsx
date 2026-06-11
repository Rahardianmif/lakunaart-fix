import { useState } from "react";
import { Sparkles } from "lucide-react";

function buildExplanation(artwork) {
  return {
    historicalContext:
      `${artwork.title} belongs to the broader context of ${artwork.department || "museum collection"}. ` +
      `The work is associated with ${artwork.artistName || artwork.artist} and is dated around ${artwork.year}. ` +
      `Its culture or place association is recorded as ${artwork.culture || "not specified"}.`,
    visualAnalysis:
      `The most important visual entry point is its medium: ${artwork.medium}. ` +
      `This invites viewers to examine surface, material, line, color, texture, scale, and the relationship between image and object.`,
    symbolism:
      `Symbolic meaning should be read carefully from the object data, period, culture, and subject matter. ` +
      `For this work, the museum description suggests the safest interpretation begins with its title, date, cultural context, and collection department.`,
    techniques:
      `The technique or material is listed as ${artwork.medium}. ` +
      `A useful analysis should ask how that medium shapes durability, detail, visual atmosphere, and viewer experience.`,
  };
}

function AIArtworkExplanation({ artwork }) {
  const [open, setOpen] = useState(false);

  if (!artwork) return null;

  const explanation = buildExplanation(artwork);

  return (
    <section className="ai-explanation-card">
      <div className="ai-explanation-header">
        <div>
          <span className="eyebrow-label">AI-style Guide</span>
          <h3>Explain This Artwork</h3>
          <p>
            A local explanation template for portfolio/demo use. It does not require an API key.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary-custom"
          onClick={() => setOpen((value) => !value)}
        >
          <Sparkles size={18} />
          {open ? "Hide Explanation" : "Explain This Artwork"}
        </button>
      </div>

      {open && (
        <div className="ai-explanation-grid">
          <article>
            <h4>Historical Context</h4>
            <p>{explanation.historicalContext}</p>
          </article>

          <article>
            <h4>Visual Analysis</h4>
            <p>{explanation.visualAnalysis}</p>
          </article>

          <article>
            <h4>Symbolism</h4>
            <p>{explanation.symbolism}</p>
          </article>

          <article>
            <h4>Techniques</h4>
            <p>{explanation.techniques}</p>
          </article>
        </div>
      )}
    </section>
  );
}

export default AIArtworkExplanation;
