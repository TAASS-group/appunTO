import React from "react";
import { Input } from "./ui/input";
import ImageViewer from "./ImageViewer";

export default function ImageInput({
  value,
  setValue,
  width,
  height,
  defaultImg = "",
}: {
  width: number;
  height: number;
  value: File | undefined;
  setValue: (value: File) => void;
  defaultImg?: string;
}) {
  const [base, setBase] = React.useState<string>("");
  const getBase64 = async (e: any) => {
    if (e == null || e.target == null) return;
    const file = e.target.files![0];
    if (!file) return;

    setValue(file);
    var fReader = new FileReader();
    fReader.readAsDataURL(file);

    fReader.onloadend = async function (event) {
      if (event.target?.result != null) {
        console.log(event.target?.result.toString());
        /*         props.onChange(event.target?.result.toString());
         */
        setBase(event.target?.result.toString());
      }
    };
  };
  return (
    <div className="flex gap-2 items-center">
      <Input
        type="file"
        accept="image/*"
        placeholder="1"
        /* {...props} */
        onChange={(e) => getBase64(e)}
      />
      <ImageViewer
        data={base.length > 0 ? base : defaultImg}
        width={width}
        height={height}
      />
    </div>
  );
}
