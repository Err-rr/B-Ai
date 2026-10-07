"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SubmitIdeaPage() {
  const [submitted, setSubmitted] = useState(false);

  function submitIdea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-2xl space-y-6 py-8">
      <div>
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          Reference
        </p>
        <h1 className="text-ink font-sans text-3xl font-semibold">
          Submit an idea
        </h1>
        <p className="text-ink-2 mt-1 text-sm">
          Share a startup idea you would like to explore.
        </p>
      </div>
      <Card>
        {submitted ? (
          <div className="space-y-2">
            <h2 className="text-ink font-sans text-lg font-semibold">
              Idea added to your workspace
            </h2>
            <p className="text-ink-2 text-sm">
              Nice start. Oryn can help you explore the idea and the students
              it could help.
            </p>
          </div>
        ) : (
          <form onSubmit={submitIdea} className="space-y-4">
            <Input label="Idea name" placeholder="A short working title" required />
            <div className="space-y-1.5">
              <label htmlFor="idea-description" className="text-ink-2 text-sm font-medium">
                What problem could it solve?
              </label>
              <textarea
                id="idea-description"
                name="description"
                rows={4}
                required
                placeholder="Describe the challenge and who experiences it..."
                className="border-line bg-card text-ink placeholder:text-ink-3 hover:border-border-hover w-full rounded-xl border px-4 py-3 text-sm transition-colors duration-150 ease-out"
              />
            </div>
            <Button type="submit">Add idea</Button>
          </form>
        )}
      </Card>
    </div>
  );
}
