'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CONTRACT_ADDRESS = 'GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump';

export default function ContractAddress() {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      /* no-op */
    }
  }

  return (
    <div className="w-full">
      <div className="text-center md:text-left text-sm font-semibold tracking-widest text-off-white/70">
        CONTRACT ADDRESS
      </div>

      {/* Original layout: single-line address + icon at the end, no wrapping */}
      <div
        className="group mt-2 flex items-center justify-between rounded-xl border border-ink-secondary bg-black/30 px-4 py-3 cursor-pointer"
        onClick={handleCopy}
        title={isCopied ? 'Copied' : 'Copy contract address'}
        aria-label={isCopied ? 'Copied' : 'Copy contract address'}
      >
        <span className="font-mono text-sm sm:text-base text-macho-orange whitespace-nowrap overflow-hidden truncate mr-4">
          {CONTRACT_ADDRESS}
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          className="flex-shrink-0"
          aria-label="Copy address"
        >
          {isCopied ? (
            <Check className="text-green-500" size={20} />
          ) : (
            <Copy className="text-gray-400 group-hover:text-white transition-colors" size={20} />
          )}
        </button>
      </div>

      {isCopied && <p className="text-xs text-green-500 mt-2">Copied to clipboard!</p>}
    </div>
  );
}
