import { Skeleton } from "@mui/material";

const MessageLoader = ({ themeID, alignment }) => {
    return (
        <>
            <div className="flex items-end bubble">
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] rounded-tl-[15px] rounded-bl-[0px] p-[10px] min-w-[40px] ml-[10px]" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candybuttonmenu border-[#FF7A92]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={188} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={31} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                </div>
            </div>
            <div className={"flex items-end bubble" + (alignment === 0 ? " flex-row-reverse" : "")}>
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] p-[10px] min-w-[40px] " + (alignment === 0 ? "mr-[10px] rounded-tr-[15px] rounded-br-[0px] " : "ml-[10px] rounded-tl-[15px] rounded-bl-[0px] ") + ((themeID === 0 || themeID === 1) ? "bg-chatback3 border-chatback3" : (themeID === 2 ? "bg-[#FFEAF9] border-[#FFCAFA]" : themeID === 3 ? "bg-[#7747DC] border-[#9277FF]" : ""))}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={188} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                </div>
            </div>
            <div className="flex items-end bubble">
                <div className="flex justify-center items-center w-[35px] h-[35px] rounded-[5px] bg-button text-subtext opacity-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] rounded-tl-[15px] rounded-bl-[0px] p-[10px] min-w-[40px] ml-[10px]" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candybuttonmenu border-[#FF7A92]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={195} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={99} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={65} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={143} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={78} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={134} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                </div>
            </div>
            <div className="flex items-end bubble">
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] rounded-tl-[15px] rounded-bl-[0px] p-[10px] min-w-[40px] ml-[10px]" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candybuttonmenu border-[#FF7A92]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={78} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={134} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={86} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                </div>
            </div>
            <div className={"flex items-end bubble" + (alignment === 0 ? " flex-row-reverse" : "")}>
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] p-[10px] min-w-[40px] " + (alignment === 0 ? "mr-[10px] rounded-tr-[15px] rounded-br-[0px] " : "ml-[10px] rounded-tl-[15px] rounded-bl-[0px] ") + ((themeID === 0 || themeID === 1) ? "bg-chatback3 border-chatback3" : (themeID === 2 ? "bg-[#FFEAF9] border-[#FFCAFA]" : themeID === 3 ? "bg-[#7747DC] border-[#9277FF]" : ""))}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={195} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={99} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={65} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={115} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={143} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={134} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={128} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={139} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={94} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                </div>
            </div>
            <div className="flex items-end bubble">
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] rounded-tl-[15px] rounded-bl-[0px] p-[10px] min-w-[40px] ml-[10px]" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candybuttonmenu border-[#FF7A92]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={188} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={31} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                </div>
            </div>
            <div className={"flex items-end bubble" + (alignment === 0 ? " flex-row-reverse" : "")}>
                <div className="flex justify-center items-center w-[35px] h-[35px] rounded-[5px] bg-button text-subtext opacity-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] p-[10px] min-w-[40px] " + (alignment === 0 ? "mr-[10px] rounded-tr-[15px] rounded-br-[0px] " : "ml-[10px] rounded-tl-[15px] rounded-bl-[0px] ") + ((themeID === 0 || themeID === 1) ? "bg-chatback3 border-chatback3" : (themeID === 2 ? "bg-[#FFEAF9] border-[#FFCAFA]" : themeID === 3 ? "bg-[#7747DC] border-[#9277FF]" : ""))}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={99} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={195} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={65} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                </div>
            </div>
            <div className={"flex items-end bubble" + (alignment === 0 ? " flex-row-reverse" : "")}>
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] p-[10px] min-w-[40px] " + (alignment === 0 ? "mr-[10px] rounded-tr-[15px] rounded-br-[0px] " : "ml-[10px] rounded-tl-[15px] rounded-bl-[0px] ") + ((themeID === 0 || themeID === 1) ? "bg-chatback3 border-chatback3" : (themeID === 2 ? "bg-[#FFEAF9] border-[#FFCAFA]" : themeID === 3 ? "bg-[#7747DC] border-[#9277FF]" : ""))}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={195} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={99} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={65} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={143} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={78} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={134} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                </div>
            </div>
            <div className="flex items-end bubble">
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] rounded-tl-[15px] rounded-bl-[0px] p-[10px] min-w-[40px] ml-[10px]" + (themeID === 0 ? " bg-button border-[#363941]" : themeID === 1 ? " bg-[#EDEDF0] border-[#C4C7CB] text-title" : themeID === 2 ? " bg-candybuttonmenu border-[#FF7A92]" : themeID === 3 ? " bg-[#322995] border-[#453CB9]" : "")}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={195} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={99} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={65} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={65} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={143} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={143} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={78} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={78} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={134} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={44} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={134} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={78} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={164} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={164} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={89} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={96} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={96} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={49} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={49} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={148} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={148} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={96} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                        <Skeleton variant="rounded" width={96} height={10} sx={{ bgcolor: themeID === 1 ? 'rgba(150,150,150,0.2)' : 'rgba(230,230,230,0.2)' }} />
                    </div>
                </div>
            </div>
            <div className={"flex items-end bubble" + (alignment === 0 ? " flex-row-reverse" : "")}>
                <div className="flex justify-center items-center w-[35px] h-[35px] rounded-[5px] bg-button text-subtext opacity-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] p-[10px] min-w-[40px] " + (alignment === 0 ? "mr-[10px] rounded-tr-[15px] rounded-br-[0px] " : "ml-[10px] rounded-tl-[15px] rounded-bl-[0px] ") + ((themeID === 0 || themeID === 1) ? "bg-chatback3 border-chatback3" : (themeID === 2 ? "bg-[#FFEAF9] border-[#FFCAFA]" : themeID === 3 ? "bg-[#7747DC] border-[#9277FF]" : ""))}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={99} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={195} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={65} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={53} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                </div>
            </div>
            <div className={"flex items-end bubble" + (alignment === 0 ? " flex-row-reverse" : "")}>
                <div className={"flex justify-center items-center w-[35px] h-[35px] rounded-[5px]" + (themeID === 0 ? " bg-button text-subtext" : themeID === 1 ? " bg-[#EDEDF0] text-title" : themeID === 2 ? " bg-candysubtext text-galaxytitle" : themeID === 3 ? " bg-[#322995] text-galaxytitle" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="currentColor">
                        <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M5.44411 3.99609C5.6546 2.80713 6.6848 1.9046 7.92396 1.9046C11.5865 1.9046 14.5722 4.95965 14.5722 8.67278C14.5722 12.4546 11.5313 15.5664 7.80058 15.5664H2.63322C1.66759 15.5664 0.754727 15.1259 0.153931 14.3699C0.153931 15.9977 1.47348 17.3172 3.10123 17.3172H7.80058C12.5081 17.3172 16.3078 13.4031 16.3078 8.67278C16.3078 4.01123 12.5633 0.153809 7.92396 0.153809C5.57411 0.153809 3.66919 2.07542 3.66919 4.44584V11.8014H2.66598C2.23715 11.8014 1.88952 11.4507 1.88952 11.0182V4.05194V3.94942C1.88952 2.46182 2.6546 1.07878 3.9148 0.288307C1.83773 0.288307 0.153931 1.97487 0.153931 4.05194V11.0182C0.153931 12.4177 1.27861 13.5522 2.66598 13.5522H8.12701C10.7429 13.5522 12.8636 11.413 12.8636 8.77415C12.8636 6.1353 10.7429 3.99609 8.12701 3.99609H5.44411ZM8.09169 11.7631H5.36947V5.70858H8.09169C9.74908 5.70858 11.0927 7.06393 11.0927 8.73584C11.0927 10.4077 9.74908 11.7631 8.09169 11.7631Z" />
                    </svg>
                </div>
                <div className={"flex flex-col space-y-[10px] msg-para group max-w-[65%] border rounded-[20px] p-[10px] min-w-[40px] " + (alignment === 0 ? "mr-[10px] rounded-tr-[15px] rounded-br-[0px] " : "ml-[10px] rounded-tl-[15px] rounded-bl-[0px] ") + ((themeID === 0 || themeID === 1) ? "bg-chatback3 border-chatback3" : (themeID === 2 ? "bg-[#FFEAF9] border-[#FFCAFA]" : themeID === 3 ? "bg-[#7747DC] border-[#9277FF]" : ""))}>
                    <div className="flex items-center space-x-[5px]">
                        <Skeleton variant="rounded" width={99} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={22} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                        <Skeleton variant="rounded" width={195} height={10} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageLoader;