import * as React from "react";

export function Table({ children, ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full border-collapse text-sm text-slate-800"
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, ...props }) {
  return (
    <thead
      className="bg-slate-100 border-b border-slate-200"
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableRow({ children, ...props }) {
  return (
    <tr
      className="border-t border-slate-200 hover:bg-slate-100 transition-colors"
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "", ...props }) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "", ...props }) {
  return (
    <td
      className={`px-4 py-3 align-middle text-slate-800 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}