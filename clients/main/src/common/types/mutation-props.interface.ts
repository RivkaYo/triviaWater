import type { AxiosError } from "axios";

export interface MutationsProps {
  onError: (error: AxiosError) => void;
  onSuccess: () => Promise<void>;
}
