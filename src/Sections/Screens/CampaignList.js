import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Selectors as InitialSelector, ActionCreators as InitialActions } from '../Redux/InitialRedux'
import ProductCard from './Components/ProductCard';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import ListTopBar from './Components/ListTopBar';
import CampaignCard from './Components/CampaignCard';

export default function CampaignList() {
    const campaignList = useSelector(InitialSelector.campaignList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pageIndex, setPageIndex] = useState(0);
    const [currentData, setCurrentData] = useState(campaignList);

    useEffect(() => {
        if (campaignList) {
            setCurrentData(campaignList)
        }
    }, [campaignList]);

    const _renderCampaigns = () => {
        if (currentData.length > 10) {
            const rendered = currentData.slice(0 + (pageIndex * 10), 10 + (pageIndex * 10))
            return rendered.map((value, index) => {
                return <CampaignCard index={index + 10 * pageIndex} value={value} />;
            })
        } else {
            return currentData.map((value, index) => {
                return <CampaignCard index={index} value={value} />;
            })
        }
    }

    return (
        <div style={{
            flex: 1,
            justifyContent: 'center',
            display: 'flex',
            marginTop: 50,
            marginBottom: 50
        }}>
            <div style={{
                width: '80%'
            }}>
                <div style={{
                    width: '100%',
                    height: 100,
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '1px 2px 9px #3bb77e',
                    backgroundColor: '#3bb77e',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>
                    <div style={{
                        width: '10%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{"Sıra"}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        marginLeft: 20,
                        width: '25%',
                    }}>{'Kampanya Başlığı'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '35%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{'Açıklama'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '10%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{'Renk'}</div>
                    <div style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: 'white'
                    }} />
                    <div style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>{'Aksiyon'}</div>
                </div>

                {/* <ListTopBar
                    // _setSearchData={_setSearchData}
                    _setPage={_setPage}
                    pageIndex={pageIndex} /> */}

                {_renderCampaigns()}

                {/* <ListTopBar
                    _setPage={_setPage}
                    pageIndex={pageIndex} /> */}

            </div>
        </div>
    )
}
