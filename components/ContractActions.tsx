"use client";

import Link from "next/link";
import { Icon } from "./Icon";

export function ContractActions() {
  return (
    <div className="no-print flex flex-col gap-3 sm:flex-row">
      <button type="button" onClick={() => window.print()} className="btn-secondary">
        <Icon name="arrow" className="h-4 w-4 rotate-90" /> Print / save PDF
      </button>
      <Link href="/contact" className="btn-primary">
        Discuss your project <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </div>
  );
}
