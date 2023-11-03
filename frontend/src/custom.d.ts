declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
}