"use client";

import type { Product } from "@/lib/shopify/types";
import { useState } from "react";

export function DevMetafields({ product }: { product: Product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="mt-8 border-t pt-8 dark:border-neutral-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
      >
        <span>{isExpanded ? "Hide" : "Show"} Development Metafields</span>
        <svg
          className={`h-4 w-4 transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
          <h3 className="mb-4 text-sm font-medium">Product Metafields</h3>
          {product.metafields ? (
            product.metafields.length > 0 ? (
              <div className="grid gap-4">
                {product.metafields.map((metafield) =>
                  metafield ? (
                    <div
                      key={metafield.id}
                      className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {metafield.namespace}.{metafield.key}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {metafield.type}
                        </span>
                      </div>
                      <div className="overflow-auto rounded bg-neutral-100 p-3 text-xs dark:bg-neutral-800">
                        {metafield.value}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No metafields found for this product.
              </p>
            )
          ) : (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Loading metafields...
            </p>
          )}
        </div>
      )}
    </div>
  );
}