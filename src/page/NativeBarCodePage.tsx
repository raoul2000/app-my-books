import { MyCodeBarScanner } from "@/component/MyCodeBarScanner";
import React, { useState } from "react";

export const NativeBarCodePage: React.FC<{}> = (): JSX.Element => {
    const [data, setData] = useState("Not Found");

    return (
        <div className="barcode">
            <MyCodeBarScanner 
                            width={500}
                            height={500}
                            onUpdate={(err, result) => {
                                if (result) setData(result.getText());
                                else setData("Not Found");
                            }}
                        />
            
            <p>{data}</p>
        </div>
    );
};
