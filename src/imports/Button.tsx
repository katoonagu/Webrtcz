export default function Button() {
  return (
    <div className="bg-[#dee9f5] relative rounded-[10px] size-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5e0eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center pb-[12.5px] pt-[11.5px] px-[17px] relative size-full">
          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e7680] text-[16px] text-center text-nowrap">
            <p className="leading-[16px] whitespace-pre">Join</p>
          </div>
        </div>
      </div>
    </div>
  );
}