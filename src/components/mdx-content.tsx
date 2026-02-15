import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return <Link href={href} {...props} />;
    }
    if (href?.startsWith("#")) {
      return <a href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  },
  // Add more custom components as needed
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <Component components={components} />
    </div>
  );
}
