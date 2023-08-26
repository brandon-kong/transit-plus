import { Input as ShadInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadInput>) => (
    <ShadInput
        className={cn(
            "border border-gray-200 focus:ring-0 focus:outline-none focus:border-gray-200",
            className
        )}
        {...props}
    />
)