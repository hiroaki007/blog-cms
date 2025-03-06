"use client"; // ✅ クライアントコンポーネント

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// QueryClientProvider をラップするコンポーネント
export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
