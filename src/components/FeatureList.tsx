import React from "react";

interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="space-y-2 mb-6">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start">
          <span className="mr-2 text-green-500">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
