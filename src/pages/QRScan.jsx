import styled from "styled-components";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import BoardInNav from "../components/BoardInNav";
import QRScanFinderIcon from "../assets/icon/qrscan_finder_icon.svg?react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    height: 100dvh; 
    display: flex;
    flex-direction: column;
    background-color: #48BFA2;
`;

const CameraContainer = styled.div`
    height: 100%;
`

const ScannerWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;     /* 혹은 500px 등 고정 높이 */
    overflow: hidden;
`;

const BlurOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  backdrop-filter: blur(9px);
  mask-image: 
    linear-gradient(#000, #000),
    ${(props) => getRoundedRectSvgStr(props.size, props.radius)};

  mask-position: center, center;
  mask-repeat: no-repeat, no-repeat;
  mask-size: 100% 100%, auto;
  mask-composite: exclude;
`;

const getRoundedRectSvgStr = (size, radius) => {
    const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#000" />
    </svg>
  `.trim();
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
};

const FinderArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  z-index: 20;
  pointer-events: none;
  border: 1px solid #FFF;
  border-radius: ${(props) => props.radius}px;
  overflow: hidden; 
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 4px;
  box-sizing: border-box; 
`;

const ErrorMessage = styled.div`
    padding: 20px;
    background-color: #ffebeb;
    color: #cc0000;
    border: 1px solid #cc0000;
    border-radius: 4px;
    text-align: center;
    margin-top: 15px;
`;

const FinderInnerBox = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 1px solid #FFF;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FINDER_SIZE = 240;
const FINDER_RADIUS = 23;

export default function QRScan() {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [permissionState, setPermissionState] = useState('prompt');
    const SERVER_URL = import.meta.env.VITE_SERVER_URL

    // 권한 상태와 장치 목록을 모두 업데이트하는 함수
    const updateDevices = useCallback(async () => {
        setIsInitialized(false);
        let currentPermissionState = 'prompt';

        // 1. 권한 상태 조회
        try {
            const permissionStatus = await navigator.permissions.query({ name: 'camera' });
            currentPermissionState = permissionStatus.state;
            setPermissionState(currentPermissionState);
        } catch (e) {
            console.error("Permission API error:", e);
            currentPermissionState = 'granted';
            setPermissionState('granted');
        }

        if (currentPermissionState === 'granted') {
            try {
                const mediaDevices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = mediaDevices.filter(d => d.kind === 'videoinput');

                setDevices(videoDevices);

                if (selectedDevice && videoDevices.some(d => d.deviceId === selectedDevice)) {
                } else if (videoDevices.length > 0 && videoDevices[0].label !== '') {
                    const backCameras = videoDevices.filter(device =>
                        device.label.toLowerCase().includes('back') ||
                        device.label.toLowerCase().includes('rear') ||
                        device.label.toLowerCase().includes('후면')
                    );

                    if (backCameras.length > 0) {
                        const mainCamera = backCameras.find(device =>
                            device.label.includes('0') ||
                            device.label.toLowerCase().includes('main')
                        );
                        setSelectedDevice(mainCamera ? mainCamera.deviceId : backCameras[0].deviceId);
                    } else {
                        setSelectedDevice(videoDevices[0].deviceId);
                    }
                }
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        }

        setIsInitialized(true);
    }, [selectedDevice]);

    useEffect(() => {
        updateDevices();
        async function watchPermission() {
            try {
                const permissionStatus = await navigator.permissions.query({ name: 'camera' });
                permissionStatus.onchange = () => {
                    updateDevices();
                };
            } catch (e) { }
        }
        watchPermission();

        navigator.mediaDevices.addEventListener('devicechange', updateDevices);
        return () => navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    }, [updateDevices]);

    const highlightCodeOnCanvas = (detectedCodes, ctx) => {
        detectedCodes.forEach((detectedCode) => {
            const { boundingBox, cornerPoints } = detectedCode;

            // Draw bounding box
            ctx.strokeStyle = '#48BFA2';
            ctx.lineWidth = 1;
            ctx.strokeRect(
                boundingBox.x,
                boundingBox.y,
                boundingBox.width,
                boundingBox.height
            );
        });
    };

    const handleScan = (result) => {
        const value = result[0].rawValue
        async function postData() {
            try {
                const response = await fetch(`${SERVER_URL}/api/roomcheckins`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({qrData: value})
                })
                const result = await response.json();
                if (response.ok) {
                    alert("입실체크 되었습니다!")
                    navigate('/');
                }
            } catch (e) {
                console.error("QR코드 체크과정 중 에러 발생")
            }
        }
        postData();
    }

    const renderScannerContent = () => {
        if (!isInitialized) {
            // 초기 로딩 중
            return (
                <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    카메라 찾는 중...
                </div>
            );
        }

        if (permissionState === 'denied') {
            return (
                <ErrorMessage>
                    ⚠️ 카메라 권한이 차단되었습니다.<br />
                    설정에서 카메라 접근을 허용해주세요.
                </ErrorMessage>
            );
        }

        return (
            <ScannerWrapper>
                <Scanner
                    onScan={handleScan}
                    allowMultiple={true}
                    formats={['qr_code']}
                    scanDelay={5000}
                    sound={false}
                    components={{
                        tracker: highlightCodeOnCanvas,
                        torch: true, // Show torch/flashlight button (if supported)
                        finder: false,
                    }}
                    constraints={
                        {
                            deviceId: selectedDevice,
                            aspectRatio: 1,
                            width: { ideal: 1600 },
                            height: { ideal: 1600 },
                        }
                    }
                    styles={{
                        container: { width: '100%', height: '100%' },
                        video: { objectFit: 'cover' }
                    }}

                />
                <BlurOverlay size={FINDER_SIZE} radius={FINDER_RADIUS} />
                <FinderArea size={FINDER_SIZE} radius={FINDER_RADIUS}>
                    <FinderInnerBox>
                        <QRScanFinderIcon />
                    </FinderInnerBox>
                </FinderArea>
            </ScannerWrapper>
        );
    }

    return (
        <Container>
            <Header />
            <BoardInNav title={"QR 스캔"} />
            {/* <select
                onChange={(e) => setSelectedDevice(e.target.value)}
                value={selectedDevice}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            >
                {devices.map((device, index) => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `카메라 ${index + 1}`}
                    </option>
                ))}
            </select> */}

            <CameraContainer>
                {!isInitialized ? (
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        카메라 찾는 중...
                    </div>
                ) : (
                    renderScannerContent()
                )}
            </CameraContainer>
        </Container>
    );
}