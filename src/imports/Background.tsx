import svgPaths from "./svg-w1qylb7olg";
import { imgGroup } from "./svg-3spr8";

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12.5px_25px] mask-size-[175px_150px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 200">
        <g id="Group">
          <path d="M200 0H0V200H200V0Z" fill="var(--fill-0, #4A4A4A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[12.5%_6.25%]" data-name="Mask group">
      <Group />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[200px]" data-name="SVG">
      <MaskGroup />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center rounded-[14px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[32px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 24">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p42b9300} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1cdf3c00} fill="var(--fill-0, #FF0055)" fillRule="evenodd" id="Vector_2" />
          <path d="M3.375 19.875L20.625 2.625" id="Vector_3" stroke="var(--stroke-0, #FF0055)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.50062" />
          <path clipRule="evenodd" d={svgPaths.p1cdf3c00} fill="var(--fill-0, #FF0055)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ButtonMute() {
  return (
    <div className="basis-0 bg-[#252a30] content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[10px] shrink-0 w-full" data-name="Button - Mute">
      <Svg1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[40px]" data-name="Container">
      <ButtonMute />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-[4px] py-0 relative shrink-0 w-[48px]" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[25px] relative shrink-0 w-[38px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 25">
        <g id="SVG">
          <path d={svgPaths.p1c1c8471} fill="var(--fill-0, white)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3dc91200} fill="var(--fill-0, #FF0055)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonStopVideo() {
  return (
    <div className="basis-0 bg-[#252a30] content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[10px] shrink-0 w-full" data-name="Button - Stop Video">
      <Svg2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[40px]" data-name="Container">
      <ButtonStopVideo />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-[4px] py-0 relative shrink-0 w-[48px]" data-name="Margin">
      <Container2 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p327c51f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonStopVideo1() {
  return (
    <div className="basis-0 bg-[#252a30] content-stretch flex grow items-center justify-center min-h-px min-w-px relative rounded-[8px] shrink-0 w-full" data-name="Button - Stop Video">
      <Svg3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[40px]" data-name="Container">
      <ButtonStopVideo1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-[4px] py-0 relative shrink-0 w-[48px]" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bottom-[8px] content-stretch flex h-[40px] items-start justify-center left-1/2 rounded-[10px] translate-x-[-50%] w-[176px]" data-name="Container">
      <Margin />
      <Margin1 />
      <Margin2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[252px] relative shrink-0 w-[448px]" data-name="Container">
      <Container />
      <Container4 />
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#242424] content-stretch flex items-center justify-center relative rounded-[14px] size-full" data-name="Background">
      <Container5 />
    </div>
  );
}