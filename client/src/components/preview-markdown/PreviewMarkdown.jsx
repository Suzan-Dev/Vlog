/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import usePreviewMarkdownStyles from './styles';

export default function PreviewMarkdown({ source }) {
  const classes = usePreviewMarkdownStyles();

  return (
    <div className={classes.mdContainer}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className={classes.mdCodeBlock} {...props}>
                {children}
              </div>
            ) : (
              <code className={classes.mdInlineCode} {...props}>
                {children}
              </code>
            );
          },
          a({ children, ...props }) {
            return (
              <a target="_blank" className={classes.mdLink} {...props}>
                {children}
              </a>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote className={classes.mdBlockQuote} {...props}>
                <div className={classes.mdBlockQuoteFlag} />
                {children}
              </blockquote>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
