import { Modal } from "@mui/material";
import { useRef } from "react";
import Avatar from "react-avatar-edit";

const DoppleCropModal = ({ fileUrl, setFileUrl, open, setOpen, setPreview, setPreparingPreview }) => {
	const avatarEditor = useRef(null);
	const onClose = () => {
		setPreview("");
		setPreparingPreview(false);
	}

	const saveImage = () => {
		setOpen(false);
		setPreparingPreview(false);
	}

	const onCrop = (preview) => {
		setPreview(preview);
		setPreparingPreview(false);
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
		setOpen(false);
		setPreparingPreview(false);
	}

	return (
		<Modal open={open}>
			<div className="fixed top-1/2 md:top-[103px] left-1/2 -translate-y-1/2 md:translate-y-0 -translate-x-1/2 bg-nav-desktop outline-none rounded-[10px] shadow-lg w-[335px] md:w-[450px]">
				<div className="flex flex-col px-5 py-[30px] md:p-[30px]">
					<span className="mb-[30px] font-semibold text-[24px] leading-[28px] text-center">Crop Your Image</span>
					{fileUrl ?
						<>
							<div className="avatar-container"><Avatar ref={avatarEditor} exportAsSquare cropRadius={0} width={"100%"} height={388} onCrop={_preview => onCrop(_preview)} onClose={onClose} onBeforeFileLoad={elem => onBeforeFileLoad(elem)} src={fileUrl} /></div>
							<div className="flex justify-between space-x-[8.5px] md:space-x-3 mt-[30px]">
								<button className="flex-1 h-[50px] bg-white text-black rounded-[5px] font-semibold text-[14px] leading-[16.71px]" onClick={close}>
									Cancel
								</button>
								<button className="bg-blue2 rounded-[5px] flex-1 h-[50px] font-semibold text-[14px] leading-[16.71px]" onClick={saveImage}>
									Save Image
								</button>
							</div>
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

export default DoppleCropModal;