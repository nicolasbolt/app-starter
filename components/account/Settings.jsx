// TODO:
// data into personal info
// data into billing info
// add prev conversations into sidebar

'use client';

import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'
import {Button} from '../ui/button';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import Link from 'next/link';

const Settings = ({session}) => {
    const [settingsChanged, setSettingsChanged] = useState(false);
    const [settingsSaved, setSettingsSaved] = useState(false);
    const [selectValue, setSelectValue] = useState('Option 1');

    
    const saveSettings = async () => {
        setSettingsSaved(true);
        // try {
        //     await fetch('/api/user?language=' + language + '&level=' + level + '&nativeLanguage=' + nativeLanguage, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        // } catch (error) {
        //     console.error('Error saving settings: ', error);
        // }
        
    };

      const getUser = async () => {
        const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const user = await response.json()

        console.log('user: ', user);

      };


    //   useEffect(() => {
    //     getUser();
    //   }, [session]);

      const valOnChange = (e) => {
        setSelectValue(e);
        setSettingsChanged(true);
      }

    const data = [
        {
            title: 'Setting 1:',
            value: selectValue,
            canEdit: true,
            editType: 'SELECT',
            selectOptions: [{text: 'Option 1', value: 'option_1'}, {text: "Option 2", value: 'option_2'}],
            selectValue: selectValue,
            selectOnChange: valOnChange,
        },
        {
            'title': 'Page Name:',
            'value': 'Page Value',
            canEdit: true,
            editType: 'NEW_PAGE',
            href: '#',
        }
    ]
return (
    <Card className='mt-12'>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
        </CardHeader>

        <CardContent>
            {data.map((item, index) => (
                <div key={index} className='grid grid-cols-2 py-3 items-center'>
                    <p className='mr-2'>{item.title}</p>
                    {(() => {
                        switch (item.editType) {
                            case 'SELECT':
                                return (
                                    <Select value={item.selectValue} onValueChange={item.selectOnChange}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {item.selectOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.text}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                );
                            case 'NEW_PAGE':
                                return (
                                    <div>
                                    <div className='flex items-center justify-center'>

                                    {/* if you want an image with the button: add this style to the div above this comment: my-4 */}
                                    {/* <Image
                                        src=''
                                        width='50'
                                        height='50'
                                        alt='Page Picture'
                                        className='rounded-full mr-2'
                                    /> */}

                                    <p className='mr-3'>{item.name}</p>
                                    </div>
                                        <Button asChild className='w-full' variant='outline'>
                                            <Link href={item.href}>{item.value}</Link>
                                        </Button>
                                    </div>
                                    
                                );
                            case 'TEXT':
                                return <p>Text</p>
                            default:
                                return <p>Default Value</p>;
                        }
                    })()}
                </div>
            ))}

            {settingsSaved ?  <Button disabled={true}>Changes Saved!</Button> : (
            <Button onClick={saveSettings} disabled={!settingsChanged}>Save Changes</Button>

            )}
        </CardContent>
    </Card>
);
}

export default Settings
