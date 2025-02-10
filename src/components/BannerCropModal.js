import { Modal } from "@mui/material";
import { useState } from "react";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const BannerCropModal = ({ imageToCrop, fileUrl, setFileUrl, open, setOpen, setPreview, setPreparingPreview }) => {
	const [crop, setCrop] = useState({ unit: "%", x: 0, y: 0, width: 50, aspect: 1.5 });
	const [image, setImage] = useState(null);

	const saveImage = () => {
		setOpen(false);
		setPreparingPreview(false);
	}

	const complete = async () => {
		if (image) {
			const canvas = document.createElement('canvas');
			const scaleX = image.naturalWidth / image.width;
			const scaleY = image.naturalHeight / image.height;
			canvas.width = crop.width;
			canvas.height = crop.height;
			const ctx = canvas.getContext('2d');

			const pixelRatio = window.devicePixelRatio;
			canvas.width = crop.width * pixelRatio;
			canvas.height = crop.height * pixelRatio;
			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			ctx.imageSmoothingQuality = 'high';

			ctx.drawImage(
				image,
				crop.x * scaleX,
				crop.y * scaleY,
				crop.width * scaleX,
				crop.height * scaleY,
				0,
				0,
				crop.width,
				crop.height,
			);

			const base64Image = canvas.toDataURL('image/jpeg');
			setPreview(base64Image);
			setPreparingPreview(false)
		}
	}

	const imageLoaded = (e) => {
		setImage(e)
	}

	const close = () => {
		setFileUrl("")
		setPreview("")
		setOpen(false)
		setPreparingPreview(false)
	}

	return (
		<Modal open={open}>
			<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[90vw] max-h-[90vh] overflow-auto bg-nav-desktop outline-none rounded-[10px] shadow-lg w-[335px] md:w-[450px]">
				<div className="flex flex-col px-5 py-[30px] md:p-[30px]">
					<span className="mb-[30px] font-semibold text-[24px] leading-[28px] text-center">Crop Your Image</span>
					{imageToCrop ?
						<>
							<ReactCrop
								crop={crop} onChange={setCrop}
								onComplete={complete}
								// minWidth={800}
								// minHeight={500}
								// maxWidth={800}
								// maxHeight={500}
								src={imageToCrop} onImageLoaded={imageLoaded}
							/>
							<div className="flex justify-between space-x-[8.5px] md:space-x-3 mt-[30px]">
								<button className="w-[188px] h-[50px] bg-white text-black rounded-[5px] font-semibold text-[14px] leading-[16.71px]" onClick={close}>
									Cancel
								</button>
								<button className="bg-blue2 rounded-[5px] w-[188px] h-[50px] font-semibold text-[14px] leading-[16.71px]" onClick={saveImage}>
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

export default BannerCropModal;