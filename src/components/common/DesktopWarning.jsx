import ElevatedWindow from "./ElevatedWindow";

export default function DesktopWarning() {
  return (
    <ElevatedWindow>
      <div className="w-[270px] p-10 text-center flex flex-col gap-2">
        <p>
          The App is not optimized for Tab and Desktop Size screens.
        </p>
        <p>
          Please revisit using a Mobile or use Developer tools to mimic a mobile screen.
        </p>
      </div>
    </ElevatedWindow>
  )
}