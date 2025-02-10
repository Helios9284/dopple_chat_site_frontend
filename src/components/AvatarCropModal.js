import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import Avatar from "react-avatar-edit";

const AvatarCropModal = ({ fileUrl, setFileUrl, open, setOpen, previews, setPreviews, setIndexUnsaved }) => {
	const [preview, setPreview] = useState("");
	const [loadedFileURL, setLoadedFileURL] = useState(false);
	const avatarEditor = useRef(null);
	const onClose = () => {
		setPreview("");
		setLoadedFileURL(false);
		setFileUrl("");
	}

	const saveImage = async () => {
		setOpen(false);

		const data = new FormData()
		data.append("file", preview)
		data.append("upload_preset", "v3okwqmh")
		data.append("cloud_name", "du1twfuco")
		const { url } = await fetch("https://api.cloudinary.com/v1_1/du1twfuco/image/upload", {
			method: "post",
			body: data
		}).then(resp => resp.json());

		console.log(url)
		let tmp = [...previews]
		tmp.push(url)
		setPreviews(tmp);
		setLoadedFileURL(false);
		setFileUrl("");
		setIndexUnsaved(tmp.length - 1);
	}

	const onCrop = (preview) => {
		setPreview(preview);
	}

	const onBeforeFileLoad = (elem) => {
		// if (elem.target.files[0].size > 71680) {
		// 	alert("File is too big!");
		// 	elem.target.value = "";
		// }
	}

	const close = () => {
		setFileUrl("");
		setPreview("");
		setOpen(false)
		setLoadedFileURL(false);
	}

	return (
		<Modal open={open}>
			<div className="fixed top-1/2 md:top-[103px] left-1/2 -translate-y-1/2 md:translate-y-0 -translate-x-1/2 bg-nav-desktop outline-none rounded-[10px] shadow-lg w-[335px] md:w-[450px]">
				<div className="flex flex-col py-[30px] md:pb-[46px] px-[30px] max-h-[80vh] overflow-auto">
					<span className="mb-[30px] font-semibold text-[20px] md:text-[24px] leading-[23.87px] md:leading-[28.64px] text-center">Crop Your Image</span>
					{fileUrl ?
						<>
							<div className="avatar-container relative min-h-[32px]">
								<div className={loadedFileURL ? "visible" : "invisible"}>
									<Avatar ref={avatarEditor} exportAsSquare cropRadius={0} width={"100%"} height={388} onCrop={_preview => onCrop(_preview)} onClose={onClose} onBeforeFileLoad={elem => onBeforeFileLoad(elem)} src={fileUrl} onImageLoad={() => setLoadedFileURL(true)} />
								</div>
								{!loadedFileURL &&
									<div className="flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2">
										<svg className='spinnerInner' viewBox='0 0 120 120'>
											<circle cx='60' cy='60' r='50' />
										</svg>
									</div>
								}
							</div>
							{loadedFileURL &&
								<div className="flex justify-between space-x-[8.5px] md:space-x-3 mt-[30px]">
									<button className="flex-1 h-[50px] bg-subtext text-white rounded-[5px] font-semibold text-[14px] leading-[16.71px]" onClick={close}>
										Cancel
									</button>
									<button className="flex-1 h-[50px] bg-blue2 text-white rounded-[5px] font-semibold text-[14px] leading-[16.71px]" onClick={saveImage}>
										Save Image
									</button>
								</div>
							}
						</>
						:
						<div className="flex justify-center items-center">
							<svg className='spinnerInner' viewBox='0 0 120 120'>
								<circle cx='60' cy='60' r='50' />
							</svg>
						</div>
					}
					<button className="flex justify-center items-center w-[35px] h-[35px] absolute top-0 right-0 bg-black3 rounded-tr-[5px] rounded-bl-[5px]" onClick={close}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L11 11M1 11L11 1" stroke="#6A7179" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default AvatarCropModal;