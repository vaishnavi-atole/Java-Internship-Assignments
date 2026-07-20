export interface Department { id?: number; name: string; description?: string; departmentHead?: string; active?: boolean; }
export interface Doctor { id?: number; firstName: string; lastName: string; qualification?: string; specialization?: string; departmentId?: number; departmentName?: string; experienceYears?: number; phone?: string; email?: string; password?: string; availability?: string; consultationFee?: number; photoUrl?: string; active?: boolean; }
export interface Patient { id?: number; patientId?: string; firstName: string; lastName: string; gender?: string; dob?: string; age?: number; bloodGroup?: string; phone?: string; email?: string; address?: string; emergencyContact?: string; medicalHistory?: string; photoUrl?: string; active?: boolean; }
export interface Appointment { id?: number; doctorId: number; patientId: number; appointmentDate?: string; appointmentTime?: string; reason?: string; status?: string; doctorName?: string; patientName?: string; }
export interface Prescription { id?: number; prescriptionNumber?: string; doctorId: number; patientId: number; medicine: string; dosage?: string; duration?: string; instructions?: string; visitDate?: string; doctorName?: string; patientName?: string; }
export interface Bill { id?: number; billNumber?: string; patientId: number; consultationFee?: number; medicineFee?: number; labFee?: number; discount?: number; gst?: number; totalAmount?: number; paymentStatus?: string; patientName?: string; }
export interface DashboardMonth { label: string; count: number; }
export interface DashboardSummary { totalPatients: number; totalDoctors: number; totalDepartments: number; todayAppointments: number; pendingConsultations?: number; monthlyAppointments: DashboardMonth[]; }
export interface PhotoUpload { url: string; }
export interface Receptionist { id?: number; username: string; password?: string; firstName: string; lastName: string; email: string; enabled?: boolean; }
export interface ApiResponse<T> { status: boolean; message: string; data: T; timestamp: string; }
