import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getUserProfle, updateUserDetails, updateUserProfilePic } from '../../store/user/userThunk'
import { FaCamera } from "react-icons/fa"
import { useNavigate } from 'react-router'

function UserAccountPage() {
  const selectCategories = [
    'Fashion', 'Electronics', 'Books', 'Home & Kitchen',
    'Toys', 'Sports', 'Beauty', 'Automotive', 'Grocery'
  ]

  const [loading, setLoading] = useState(false)
  const { logginUser } = useSelector(state => state.user)
  const [updateUser, setUpdateUser] = useState(false)
  const [editProfilePic, setEditProfilePic] = useState(false)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState(logginUser?.username?.firstName || "")
  const [lastName, setLastName] = useState(logginUser?.username?.lastName || "")
  const [contactNumber, setContactNumber] = useState(logginUser?.contactNumber || "")
  const [address, setAddress] = useState(logginUser?.address || "")
  const [date, setDate] = useState(logginUser?.dateOfBirth?.slice(0, 10) || "")
  const [gender, setGender] = useState(logginUser?.gender || '')
  const [favoriteCategories, setFavoriteCategories] = useState(logginUser?.favoriteCategories || [])
  const [profilePic, setProfilePic] = useState(logginUser?.profileImage || "")
  const [image, setImage] = useState("")
  const navigate = useNavigate()

  const handleFavoriteCategoriesChange = (e) => {
    const values = Array.from(e.target.selectedOptions, opt => opt.value)
    setFavoriteCategories(values)
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (!file) return toast.error('Please upload a valid file')
    setImage(file)
    setProfilePic(URL.createObjectURL(file))
  }

  const handleUploadProfilePic = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('userToken')
    setLoading(true)
    const form = new FormData()
    form.append('profilePic', image)

    dispatch(updateUserProfilePic(form)).then((res) => {
      if (res?.meta?.rejectedWithValue) {
        toast.error(res?.payload?.message)
      } else {
        toast.success(res?.payload?.data)
        setEditProfilePic(false)
      }
      setLoading(false)
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setLoading(true)
    const currDate = Number(new Date().toDateString().slice(11, 15))
    let dateOfBirth = Number(new Date(date).toDateString().slice(11, 15))

    if (date && !(dateOfBirth + 12 < currDate)) {
      toast.error('Your age must be 12 years or more')
      setLoading(false)
      return
    }

    const userData = {
      username: { firstName, lastName },
      contactNumber,
      address,
      dateOfBirth: date,
      gender,
      favoriteCategories
    }

    dispatch(updateUserDetails({ userData, id: logginUser._id })).then(res => {
      if (res?.meta?.rejectedWithValue) {
        toast.error(res.payload.message)
      } else {
        dispatch(getUserProfle())
      }
      setLoading(false)
      setUpdateUser(false)
    })
  }

  if (!logginUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="alert alert-warning shadow-lg">
          <span>Please log in to access your profile.</span>
        </div>
      </div>
    )
  }

  if (!editProfilePic) return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-[80vh] text-primary" data-theme='night'>
      {updateUser ? (
        <form className="card w-full max-w-md bg-base-100 shadow-xl p-6 space-y-4" onSubmit={handleUpdate}>
          <h2 className="font-bold text-lg mb-4">Update your details</h2>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="input input-bordered w-full" placeholder="First Name" />
          <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" className="input input-bordered w-full" placeholder="Last Name" />
          <input value={contactNumber} onChange={e => setContactNumber(e.target.value)} type="number" className="input input-bordered w-full" placeholder="Contact Number" />
          <input value={address} onChange={e => setAddress(e.target.value)} type="text" className="input input-bordered w-full" placeholder="Address" />
          <label className="label">Select your favorite categories</label>
          <select multiple className="select select-bordered w-full" value={favoriteCategories} onChange={handleFavoriteCategoriesChange}>
            {selectCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <label className="label">Select Gender</label>
          <select className="select select-bordered w-full" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="">Select your gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input input-bordered w-full" />
          <button type="submit" className={`btn w-full ${loading ? 'btn-disabled btn-outline' : 'btn-primary'}`}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => setUpdateUser(false)} className="btn w-full">Cancel</button>
        </form>
      ) : (
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="avatar relative">
              <div className="w-24 rounded-full overflow-hidden bg-base-200">
                <img src={logginUser.profileImage || "/placeholder.webp"} alt="Profile" />
                <button type="button" className="btn btn-sm btn-circle btn-primary absolute bottom-2 right-2 shadow-md" title="Edit Profile Photo" onClick={() => setEditProfilePic(!editProfilePic)}>
                  <FaCamera className="text-white" />
                </button>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{logginUser.username.firstName} {logginUser.username.lastName.trim()}</h1>
            <div className="text-primary">{logginUser?.address || 'No address'}</div>
            <div className="text-sm text-primary">Contact: {logginUser?.contactNumber || <span className="text-error">N/A</span>}</div>
            <div className="text-primary">Email: {logginUser?.email}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {logginUser?.favoriteCategories?.length > 0 ? (
                logginUser.favoriteCategories.map((item, idx) => (
                  <span key={idx} className="badge badge-primary badge-outline">{item}</span>
                ))
              ) : (
                <span className="badge badge-neutral">No favorite categories</span>
              )}
            </div>
            <div className="mt-2">
              <span className={`badge ${logginUser.isEmailVerified ? 'badge-success' : 'badge-error'}`}>
                {logginUser.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
              </span>
            </div>
            <button onClick={() => setUpdateUser(true)} className="btn btn-primary w-full mt-4">Edit Details</button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <form onSubmit={handleUploadProfilePic} className="flex h-[90vh] w-full items-center justify-center">
      <div className="form-control w-full max-w-xs">
        {image && <img src={profilePic} alt="Preview" className="mb-4 rounded shadow-md" />}
        <label htmlFor="profilePic" className="label cursor-pointer">
          <span className="label-text">Upload Profile Picture</span>
          <span className="btn btn-primary btn-sm ml-4">Choose File</span>
        </label>
        <input
          hidden
          type="file"
          id="profilePic"
          onChange={handleProfilePicChange}
          accept="image/*"
        />
        <div className="mt-4">
          <button disabled={loading} type="submit" className='btn btn-accent w-full'>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default UserAccountPage
