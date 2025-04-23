"use client";

import React, { useState } from 'react';
import * as fs from 'fs';

type Props = {
    sendDataToParent: (data: string) => void; // Replace `any` with the specific type of data you'll send
  };

export default function File_Upload({ sendDataToParent }: Props){
    

    const uploadFile = async(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('reading file');
        if (e.target.files != null){
            let file = e.target.files[0];
            console.log(file);
            var reader = new FileReader();
            reader.onload = function(event) {
                // The file's text will be printed here
                if (event.target != null){
                    let text = event.target.result
                    console.log(text)
                    if (text != null){
                        sendDataToParent(text.toString())
                    }
                }
            };

            reader.readAsText(file);
            if (file) {
            let data = new FormData();
            data.append('file', file);
            // axios.post('/files', data)...
            }
        } else {
            console.log('file is null');
        }
    }
    

      return (<div>
        <input type="file" onChange={(e) => uploadFile(e)} />
      </div>)
}