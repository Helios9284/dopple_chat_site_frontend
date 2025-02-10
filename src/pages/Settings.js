import Dropzone from "react-dropzone";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import originalAxios from 'axios';
import { setProfile } from "../redux/reducers/AuthReducer";
import { validateEmail } from "../utilities/format";
import axios from "../utilities/axiosConfig";

const Settings = () => {
	const dispatch = useDispatch();
	const profile = useSelector(store => store.AuthReducer.profile);
	const [doing, setDoing] = useState(false);
	const [, setOpenAvatarModal] = useState(false);
	const [avatarFileUrl, setAvatarFileUrl] = useState("");
	const [avatarPreview] = useState("");
	const [fullname, setFullname] = useState();
	const [email, setEmail] = useState();
	const [oldPassword, setOldPassword] = useState();
	const [password, setPassword] = useState();
	const [validAvatar, setValidAvatar] = useState(-1)
	const [validOldPassword, setValidOldPassword] = useState(-1)
	const [validPassword, setValidPassword] = useState(-1)
	const [validFullname, setValidFullname] = useState(-1)
	const [validEmail, setValidEmail] = useState(-1)

	const dropHandler = useCallback(async (acceptedFiles, type) => {
		const [File] = acceptedFiles;
		fetchUploadImage(File, type);
	}, []);

	const fetchUploadImage = async (file, type) => {
		setOpenAvatarModal(true);
		const data = new FormData()
		data.append("file", file)
		data.append("upload_preset", "v3okwqmh")
		data.append("cloud_name", "du1twfuco")
		const { url } = await fetch("https://api.cloudinary.com/v1_1/du1twfuco/image/upload", {
			method: "post",
			body: data
		}).then(resp => resp.json());
		setAvatarFileUrl(url);
	}
	const save = async () => {
		const { data: { ip } } = await originalAxios.get("https://api.ipify.org/?format=json");
		if (profile && avatarPreview.length > 0 && fullname?.length > 0 && email?.length > 0 && ip?.length > 0 && oldPassword?.length > 0 && password?.length > 0 && oldPassword === profile.password && validateEmail(email)) {
			setDoing(true);
			try {
				const data = new FormData()
				data.append("file", avatarPreview)
				data.append("upload_preset", "v3okwqmh")
				data.append("cloud_name", "du1twfuco")
				const { url } = await fetch("https://api.cloudinary.com/v1_1/du1twfuco/image/upload", {
					method: "post",
					body: data
				}).then(resp => resp.json());
				const { data: { success } } = await axios.put("/user", {
					fullname, email, ip, password,
					picture: url,
					id: profile.id
				})
				if (success) {
					dispatch(setProfile({
						type: 2,
						id: profile.id,
						name: fullname,
						email,
						ip,
						password,
						picture: url,
					}))
				}
			} catch (e) {
				alert(e.response.data.error)
			}
			setDoing(false);
		} else {
			setValidAvatar(avatarFileUrl?.length > 0 ? 1 : 0)
			setValidEmail((email?.length > 0 && validateEmail(email)) ? 1 : 0)
			setValidFullname(fullname?.length > 0 ? 1 : 0)
			setValidOldPassword(oldPassword?.length > 0 ? 1 : 0)
			setValidPassword(password?.length > 0 ? 1 : 0)
		}
	}
	useMemo(() => {
		if (fullname?.length > 0) setValidFullname(1)
		if (email?.length > 0) setValidEmail(1)
		if (oldPassword?.length > 0) setValidOldPassword(1)
		if (password?.length > 0) setValidPassword(1)
		if (avatarPreview.length > 0) setValidAvatar(1)
	}, [avatarPreview, fullname, email, oldPassword, password])
	return (
		<div className="max-w-[1440px] mx-auto pt-[15px] md:pt-[30px] pb-[30px] px-5 xl:px-[60px]">
			<div className="flex flex-col max-w-[553px]">
				<span className="font-semibold text-[20px] md:text-[24px] leading-[23.87px] md:leading-[28.64px]">Settings</span>
				<span className="mt-[5px] font-medium text-[12px] leading-[18px] text-black4">Edit your Dopple profile settings.</span>
				<div className="flex items-center space-x-[15px] mt-[30px]">
					<div className={"flex justify-center items-center w-[80px] h-[80px] border bg-black2 rounded-full" + (validAvatar === 0 ? " border-red1" : " border-black3")}>
						{avatarFileUrl !== "" ?
							<img className="rounded-full w-full h-full" src={avatarPreview} width="100%" height="100%" alt="" />
							:
							<img src="/images/create/blank-avatar.svg" alt="" />
						}
					</div>
					<div className="flex flex-col">
						<span className="font-semibold text-[14px] leading-[16.71px]">Change Profile Picture</span>
						<Dropzone maxFiles={1} accept={["image/*"]} onDrop={(acceptedFiles) => dropHandler(acceptedFiles, 0)}>
							{({ getRootProps, getInputProps }) => (
								<button className="gradient-button gradient-button-rounded-sm gradient-button-padding-sm w-[161px] h-[40px] text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px] mt-[5px]" {...getRootProps()}>
									<input {...getInputProps()} />
									{avatarFileUrl !== "" ? "Edit" : "Upload"}
								</button>
							)}
						</Dropzone>
					</div>
				</div>
				<div className="mt-[15px]">
					<span className="font-semibold text-[14px] leading-[16.71px]">Full Name</span>
					<div className={"flex px-[15px] py-[13px] md:py-[18px] rounded-[5px] border border-black3 bg-black2 text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px] mt-[10px] mb-[15px] relative" + ((fullname === "" || validFullname === 0) ? " border-red1" : " border-black3")}>
						<input className="placeholder-black4 w-full" placeholder={profile.username} value={fullname} onChange={e => setFullname(e.target.value)} />
					</div>
					<span className="font-semibold text-[14px] leading-[16.71px]">My Email</span>
					<div className={"flex px-[15px] py-[13px] md:py-[18px] rounded-[5px] border border-black3 bg-black2 text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px] mt-[10px] mb-[15px] relative" + ((email === "" || validEmail === 0) ? " border-red1" : " border-black3")}>
						<input className="placeholder-black4 w-full" placeholder="rubyrose@gmail.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<span className="font-semibold text-[14px] leading-[16.71px]">Change Password</span>
					<div className={"flex px-[15px] py-[13px] md:py-[18px] rounded-[5px] border bg-black2 text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px] mt-[10px] relative" + ((oldPassword === "" || validOldPassword === 0) ? " border-red1" : " border-black3")}>
						<input className="placeholder-black4 w-full" placeholder="Current Password" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
						{(oldPassword?.length > 0 && oldPassword !== profile.password) && <span className="absolute bottom-[calc(100%+10px)] right-0 text-red1 text-[10px] leading-[12px] text-right max-w-[163px] tiny:max-w-[unset]">Password entered incorrectly, changes not saved.</span>}
					</div>
					<div className={"flex px-[15px] py-[13px] md:py-[18px] rounded-[5px] border bg-black2 text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px] mt-[10px] relative" + ((password === "" || validPassword === 0) ? " border-red1" : " border-black3")}>
						<input className="placeholder-black4 w-full" placeholder="New Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<button className="gradient-button gradient-button-rounded-sm gradient-button-padding-sm w-[185px] h-[40px] md:h-[50px] text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px] mt-[15px]" onClick={save}>
						Save Changes
					</button>
				</div>
			</div>
			{doing &&
				<div className="fixed w-full h-full bg-[rgba(0,0,0,0.8)] top-0 left-0 z-[103]">
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
						<div className="flex justify-center items-center">
							<svg className='spinnerInner' viewBox='0 0 120 120'>
								<circle cx='60' cy='60' r='50' />
							</svg>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default Settings;