import type { Components } from "react-markdown"

export const markdownComponents: Components = {
  strong: ({ children }) => (
    <span className="font-bold text-green-500">**{children}**</span>
  ),
  h1: ({ children }) => (
    <h1 className="font-bold text-cyan-500"># {children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-bold text-pink-500">## {children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-bold text-yellow-500">### {children}</h3>
  ),
  em: ({ children }) => (
    <span className="text-fuchsia-400 italic">_{children}_</span>
  ),
  li: ({ children }) => <li className="">- {children}</li>,
  a: ({ href, children }) => (
    <a
      className="text-blue-500 underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-4 border-gray-400 py-1 pl-4 text-gray-600 italic">
      {children}
    </blockquote>
  ),
}
