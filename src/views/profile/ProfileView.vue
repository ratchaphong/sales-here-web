<template>
  <div class="profile-page">
    <Navbar />
    <LoadingOverlay v-if="auth.loading" />

    <div class="container">
      <div class="profile-card" v-if="auth.profile">
        <div class="avatar-wrapper editable" v-if="editMode" @click="triggerFileInput">
          <img
            :src="imageBase64 || auth.profile.avatar || defaultAvatar"
            alt="avatar"
            class="avatar clickable"
          />
          <p class="upload-hint">คลิกเพื่อเปลี่ยนรูปภาพ</p>
        </div>

        <div class="avatar-wrapper" v-else>
          <img :src="auth.profile.avatar || defaultAvatar" alt="avatar" class="avatar" />
        </div>

        <input
          type="file"
          accept="image/*"
          ref="fileInputRef"
          @change="handleFileChange"
          style="display: none"
        />

        <h2>{{ editMode ? 'แก้ไขโปรไฟล์' : 'ข้อมูลโปรไฟล์' }}</h2>

        <div v-if="!editMode" class="profile-info">
          <p><strong>ชื่อ:</strong> {{ auth.profile.name }}</p>
          <p><strong>อีเมล:</strong> {{ auth.profile.email }}</p>
          <p><strong>เบอร์โทร:</strong> {{ auth.profile.phoneNumber }}</p>
          <p><strong>ที่อยู่:</strong> {{ auth.profile.address || '-' }}</p>
          <p><strong>บทบาท:</strong> {{ auth.profile.role }}</p>
          <button @click="toggleEdit">แก้ไข</button>
        </div>

        <div v-else class="edit-form">
          <label
            >ชื่อ:
            <input v-model="form.name" />
          </label>
          <label
            >เบอร์โทร:
            <input v-model="form.phoneNumber" />
          </label>
          <label
            >ที่อยู่:
            <textarea v-model="form.address"></textarea>
          </label>
          <div class="actions">
            <button @click="saveProfile">บันทึก</button>
            <button class="btn-secondary" @click="cancelEdit">ยกเลิก</button>
          </div>
        </div>
      </div>

      <div v-else class="no-profile">
        <p>ไม่พบข้อมูลผู้ใช้</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Navbar from '@/components/Navbar.vue'
import { useProtectPage } from '@/utils/useProtectPage'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

const auth = useAuthStore()
const editMode = ref(false)
const imageFile = ref<File | null>(null)
const imageBase64 = ref<string>('')
const fileInputRef = ref<HTMLInputElement | null>(null)

useProtectPage()

const form = reactive({
  name: '',
  phoneNumber: '',
  address: '',
})

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    imageFile.value = file
    const reader = new FileReader()

    reader.onload = () => {
      imageBase64.value = reader.result as string // base64 string
    }

    reader.readAsDataURL(file)
  }
}

const toggleEdit = () => {
  if (auth.profile) {
    form.name = auth.profile.name
    form.phoneNumber = auth.profile.phoneNumber
    form.address = auth.profile.address
  }
  editMode.value = true
}

const cancelEdit = () => {
  editMode.value = false
}

const saveProfile = async () => {
  try {
    await auth.updateProfile({
      name: form.name,
      phoneNumber: form.phoneNumber,
      address: form.address,
      avatar: imageBase64.value || auth.profile?.avatar || '',
    })

    editMode.value = false
    alert('✅ บันทึกสำเร็จ')
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>

<style scoped>
.profile-page {
  position: relative;
  width: 100%;
  height: calc(100vh - 0px);
}

.profile-page .container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
}

.no-profile {
  text-align: center;
  color: var(--color-primary);
}

.profile-card {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.profile-card .avatar-wrapper {
  margin-bottom: 1rem;
}

.profile-card .avatar-wrapper.editable {
  cursor: pointer;
  position: relative;
}

.profile-card .avatar-wrapper.editable .upload-hint {
  font-size: 0.85rem;
  color: var(--color-text);
  margin-top: 0.5rem;
}

.profile-card .avatar-wrapper .avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
}

.profile-card .avatar-wrapper .avatar.clickable {
  transition: box-shadow 0.3s ease;
}

.profile-card .avatar-wrapper .avatar.clickable:hover {
  box-shadow: 0 0 0 4px var(--color-primary-hover);
}

.profile-card h2 {
  margin-bottom: 1rem;
  color: var(--color-primary-hover);
  letter-spacing: 1px;
}

.profile-card .profile-info p {
  margin-bottom: 0.5rem;
}

.profile-card .profile-info p:last-of-type {
  margin-bottom: 1rem;
}

.profile-card .edit-form label {
  display: block;
  text-align: left;
  margin-bottom: 1rem;
}

.profile-card .edit-form label input,
.profile-card .edit-form label textarea {
  margin-top: 0.25rem;
}

.profile-card .edit-form .actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
