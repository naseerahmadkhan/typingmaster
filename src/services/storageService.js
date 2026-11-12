const STORAGE_KEYS = {
  STUDENT_NAME: 'ntm_student_name',
  STUDENT_STATS: 'ntm_student_stats',
  ACTIVE_LESSON_ID: 'ntm_active_lesson_id',
  COMPLETED_DRILLS: 'ntm_completed_drills',
};

export const storageService = {
  getStudentName() {
    try {
      return localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || '';
    } catch {
      return '';
    }
  },

  saveStudentName(name) {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, name.trim());
      return true;
    } catch {
      return false;
    }
  },

  getActiveLessonId() {
    try {
      return Number(localStorage.getItem(STORAGE_KEYS.ACTIVE_LESSON_ID)) || 1;
    } catch {
      return 1;
    }
  },

  saveActiveLessonId(id) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_LESSON_ID, String(id));
    } catch {}
  },

  getCompletedDrills() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_DRILLS) || '{}');
    } catch {
      return {};
    }
  },

  markDrillCompleted(lessonId, drillType, fileIdx = 0) {
    try {
      const current = this.getCompletedDrills();
      current[`${lessonId}_${drillType}_${fileIdx}`] = true;
      localStorage.setItem(STORAGE_KEYS.COMPLETED_DRILLS, JSON.stringify(current));
      return current;
    } catch {
      return {};
    }
  },

  async recordDrillResult(payload) {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENT_STATS) || '[]');
      existing.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEYS.STUDENT_STATS, JSON.stringify(existing));
      return true;
    } catch {
      return false;
    }
  },
};