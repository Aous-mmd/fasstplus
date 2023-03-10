import React, { useRef, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CButton } from '../../components';
import { useEffect } from 'react';
import { CallApi } from '../../api/CallApi';
import ApiList from '../../api/ApiList';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ height: '100%' }}
        >
            {value === index && (
                <Box sx={{ p: 3, height: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const Privacy = () => {
    const [editorStateAR, setEditorStateAR] = useState(EditorState.createEmpty());
    const onEditorStateChangeAR = (editorState: any) => {
        setEditorStateAR(editorState);
    };
    const [editorStateEN, setEditorStateEN] = useState(EditorState.createEmpty());
    const onEditorStateChangeEN = (editorState: any) => {
        setEditorStateEN(editorState);
    };
    const [editorStateKU, setEditorStateKU] = useState(EditorState.createEmpty());
    const onEditorStateChangeKU = (editorState: any) => {
        setEditorStateKU(editorState);
    };

    const refAr = useRef<any>();
    const refEn = useRef<any>();
    const refKu = useRef<any>();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { t } = useTranslation();

    useEffect(() => {
        CallApi.get(ApiList.getPolicy).then((res) => {
            const ArData = res.data.data.policies.filter((item: any) => item.lang_id === 1)[0];
            const blocksFromHTMLAR = convertFromHTML(ArData.text);
            const contentStateAR = ContentState.createFromBlockArray(
                blocksFromHTMLAR.contentBlocks,
                blocksFromHTMLAR.entityMap
            )
            setEditorStateAR(EditorState.createWithContent(
                contentStateAR
            ))
            const EnData = res.data.data.policies.filter((item: any) => item.lang_id === 2)[0];
            const blocksFromHTMLEN = convertFromHTML(EnData.text);
            const contentStateEN = ContentState.createFromBlockArray(
                blocksFromHTMLEN.contentBlocks,
                blocksFromHTMLEN.entityMap
            )
            setEditorStateEN(EditorState.createWithContent(
                contentStateEN
            ))
            const KuData = res.data.data.policies.filter((item: any) => item.lang_id === 3)[0];
            const blocksFromHTMLKU = convertFromHTML(KuData.text);
            const contentStateKU = ContentState.createFromBlockArray(
                blocksFromHTMLKU.contentBlocks,
                blocksFromHTMLKU.entityMap
            )
            setEditorStateKU(EditorState.createWithContent(
                contentStateKU
            ))
        })
    }, []);

    const handleSubmit = () => {
        if (value === 0) {
            CallApi.post(ApiList.editPolicy, { policy_id: 1, text: refAr.current.editor.editor.children[0].innerHTML });
        } else if (value === 1) {
            CallApi.post(ApiList.editPolicy, { policy_id: 2, text: refEn.current.editor.editor.children[0].innerHTML });
        } else {
            CallApi.post(ApiList.editPolicy, { policy_id: 3, text: refKu.current.editor.editor.children[0].innerHTML });
        }
    }

    return (
        <Box sx={{ width: '100%', height: '80%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('AR')} {...a11yProps(0)} />
                    <Tab label={t('EN')} {...a11yProps(1)} />
                    <Tab label={t('KU')} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div style={{ height: '70%' }}>
                    <Editor
                        ref={refAr}
                        wrapperStyle={{ height: '100%' }}
                        editorStyle={{ backgroundColor: 'white', height: '100%' }}
                        editorState={editorStateAR}
                        placeholder={t('WriteSomeThing')!}
                        onEditorStateChange={onEditorStateChangeAR} />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{ height: '70%' }}>
                    <Editor
                        ref={refEn}
                        wrapperStyle={{ height: '100%' }}
                        editorStyle={{ backgroundColor: 'white', height: '100%' }}
                        editorState={editorStateEN}
                        placeholder={t('WriteSomeThing')!}
                        onEditorStateChange={onEditorStateChangeEN} />
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div style={{ height: '70%' }}>
                    <Editor
                        ref={refKu}
                        wrapperStyle={{ height: '100%' }}
                        editorStyle={{ backgroundColor: 'white', height: '100%' }}
                        editorState={editorStateKU}
                        placeholder={t('WriteSomeThing')!}
                        onEditorStateChange={onEditorStateChangeKU} />
                </div>
            </TabPanel>
            <CButton
                title={t('Save')}
                width='100%'
                disabled={false}
                onClick={handleSubmit}
            />
        </Box>
    )
}

export default Privacy