'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CONTRACT_ADDRESS = 'GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump';

export default function ContractAddress() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mt-8">
      <p className="text-sm uppercase font-bold tracking-wider text-gray-400 mb-2">Contract Address</p>
      <div 
        className="flex items-center justify-between bg-ink border border-ink-secondary rounded-lg p-3 cursor-pointer group"
        onClick={handleCopy}
      >
        <span className="font-mono text-xs sm:text-base text-macho-orange truncate mr-4">
          {CONTRACT_ADDRESS}
        </span>
        <button className="flex-shrink-0" aria-label="Copy address">
          {isCopied ? <Check className="text-green-500" size={20} /> : <Copy className="text-gray-400 group-hover:text-white" size={20} />}
        </button>
      </div>
       {isCopied && <p className="text-xs text-green-500 mt-2 animate-pulse">Copied!</p>}
    </div>
  );
}
