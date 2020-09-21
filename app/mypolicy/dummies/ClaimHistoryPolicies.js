export default [
  {
    name: "PRUMed",
    description: "PRULink Generasi Baru",
    decision: null,
    decision_date: null,
    need_action: true,
    progresses: [
      {
        status: "APPROVED",
        date: "13 Feb 2019",
        progress: "Registrasi Klaim",
        sub_progresses: [],
      },
      {
        status: "ON_PROGRESS",
        date: "18 Feb 2019",
        progress: "Analisa Klaim",
        sub_progresses: [
          [
            {
              title: "Membutuhkan Dokumen Tambahan",
              need_action: true,
              is_active: true,
              documents: [
                {
                  documentDesc: "Surat Keterangan Dokter",
                  docId: "95010901",
                  docType: "RequiredDocument",
                  modifiedAt: "2019-06-26T09:34:43.659Z",
                  description: "",
                  cameraType: "horizontal",
                  createdAt: "2019-05-03T13:46:12.696Z",
                  deletedAt: null,
                  createdBy: "Pru::AdminUser::1",
                  cdsDocType: "CLAIMLOOSEMAIL",
                  mainDoc: "FDCE",
                  subtitle: "",
                  modifiedBy: "Pru::AdminUser::3",
                  isRequired: "1",
                  subDoc: "Surat Keterangan Dokter",
                },
                {
                  documentDesc: "Kuitansi Perawatan",
                  docId: "95010906",
                  docType: "RequiredDocument",
                  modifiedAt: "2019-06-26T09:43:38.011Z",
                  description: "",
                  cameraType: "vertical",
                  createdAt: "2019-05-03T13:43:48.142Z",
                  deletedAt: null,
                  createdBy: "Pru::AdminUser::1",
                  cdsDocType: "CLAIMLOOSEMAIL",
                  mainDoc: "LABE",
                  subtitle: "",
                  modifiedBy: "Pru::AdminUser::3",
                  isRequired: "1",
                  subDoc: "Kuitansi Perawatan",
                },
              ],
              steps: [
                {
                  step: "Unggah dokumen tambahan",
                  additional_action: "VERTICAL_DOCUMENT_UPLOAD",
                },
              ],
            },
          ],
        ],
      },
      {
        status: "NEXT",
        date: null,
        progress: "Analisa Tanggungan",
        sub_progresses: [],
      },
      {
        status: "NEXT",
        date: null,
        progress: "Keputusan",
        sub_progresses: [],
      },
    ],
  },
  {
    name: "PRUPrime Healtcare",
    description: "PRULink Assurance Account",
    decision: "DECLINED",
    decision_date: "13 Feb 2019",
    need_action: false,
    progresses: [
      {
        status: "APPROVED",
        date: "13 Feb 2019",
        progress: "Registrasi Klaim",
        sub_progresses: [],
      },
      {
        status: "APPROVED",
        date: "14 Feb 2019",
        progress: "Analisa Klaim",
        sub_progresses: [
          [
            {
              title: "Dalam Penilaian Menyeluruh",
              need_action: false,
              is_active: false,
              steps: [],
            },
          ],
        ],
      },
      {
        status: "DECLINED",
        date: "15 Feb 2019",
        progress: "Klaim Ditolak",
        sub_progresses: [],
      },
    ],
  },
  {
    name: "PRUMed",
    description: "PRULink Assurance Account",
    decision: "APPROVED",
    decision_date: "13 Feb 2019",
    need_action: false,
    progresses: [
      {
        status: "APPROVED",
        date: "13 Feb 2019",
        progress: "Registrasi Klaim",
        sub_progresses: [],
      },
      {
        status: "APPROVED",
        date: "14 Feb 2019",
        progress: "Analisa Klaim",
        sub_progresses: [
          [
            {
              title: "Dalam Penilaian Menyeluruh",
              need_action: false,
              is_active: false,
              steps: [
                {
                  step: "Proses konfirmasi via telepon",
                  additional_action: null,
                },
                {
                  step: "Proses konfirmasi via dokumen",
                  additional_action: null,
                },
                {
                  step: "Proses penilaian lapangan",
                  additional_action: null,
                },
              ],
            },
            {
              title: "Membutuhkan Dokumen Asli",
              need_action: false,
              is_active: false,
              steps: [
                {
                  step: "Unggah dokumen tambahan",
                  additional_action: "MANUAL_DOCUMENT_SUBMISSION",
                },
              ],
            },
          ],
        ],
      },
      {
        status: "APPROVED",
        date: "15 Feb 2019",
        progress: "Klaim Diterima",
        sub_progresses: [],
      },
    ],
  },
  {
    name: "PRUMed",
    description: "PRULink Generasi Baru",
    decision: null,
    decision_date: null,
    need_action: false,
    progresses: [
      {
        status: "APPROVED",
        date: "13 Feb 2019",
        progress: "Registrasi Klaim",
        sub_progresses: [],
      },
      {
        status: "ON_PROGRESS",
        date: "18 Feb 2019",
        progress: "Analisa Klaim",
        sub_progresses: [
          [
            {
              title: "Dalam Penilaian Menyeluruh",
              need_action: false,
              is_active: true,
              steps: [
                {
                  step: "Proses konfirmasi via telepon",
                  additional_action: null,
                },
                {
                  step: "Proses konfirmasi via dokumen",
                  additional_action: null,
                },
              ],
            },
          ],
        ],
      },
      {
        status: "NEXT",
        date: null,
        progress: "Keputusan",
        sub_progresses: [],
      },
    ],
  },
  {
    name: "PRUPrime Healtcare",
    description: "PRULink Assurance Account",
    decision: "APPROVED",
    decision_date: "13 Feb 2019",
    need_action: false,
    progresses: [
      {
        status: "APPROVED",
        date: "13 Feb 2019",
        progress: "Registrasi Klaim",
        sub_progresses: [],
      },
      {
        status: "APPROVED",
        date: "14 Feb 2019",
        progress: "Analisa Klaim",
        sub_progresses: [
          [
            {
              title: "Dalam Penilaian Menyeluruh",
              need_action: false,
              is_active: false,
              steps: [
                {
                  step: "Proses konfirmasi via telepon",
                  additional_action: null,
                },
                {
                  step: "Proses konfirmasi via dokumen",
                  additional_action: null,
                },
                {
                  step: "Proses penilaian lapangan",
                  additional_action: null,
                },
              ],
            },
            {
              title: "Membutuhkan Dokumen Asli",
              need_action: false,
              is_active: false,
              steps: [
                {
                  step: "Unggah dokumen tambahan",
                  additional_action: "MANUAL_DOCUMENT_SUBMISSION",
                },
                {
                  step: "Dokumen tidak diterima dalamjangka waktu 60 hari",
                  additional_action: null,
                },
              ],
            },
          ],
        ],
      },
      {
        status: "APPROVED",
        date: "15 Feb 2019",
        progress: "Kasus Ditutup",
        sub_progresses: [],
      },
    ],
  },
  {
    name: "PRUMed",
    description: "PRULink Generasi Baru",
    decision: null,
    decision_date: null,
    need_action: false,
    progresses: [
      {
        status: "APPROVED",
        date: "13 Feb 2019",
        progress: "Registrasi Klaim",
        sub_progresses: [],
      },
      {
        status: "ON_PROGRESS",
        date: "18 Feb 2019",
        progress: "Analisa Klaim",
        sub_progresses: [
          [
            {
              title: "Dalam Penilaian Menyeluruh",
              need_action: false,
              is_active: true,
              steps: [],
            },
          ],
        ],
      },
      {
        status: "NEXT",
        date: null,
        progress: "Keputusan",
        sub_progresses: [],
      },
    ],
  },
  {
    name: "PRUPrime Healtcare",
    description: "PRULink Assurance Account",
    decision: null,
    decision_date: null,
    need_action: false,
    progresses: [
      {
        status: "APPROVED",
        date: "07 Feb 2019",
        progress: "Pendaftaran Cepat Dengan QR",
        sub_progresses: [],
      },
      {
        status: "ON_PROGRESS",
        date: "08 Feb 2019",
        progress: "Klaim Diproses",
        sub_progresses: [],
      },
      {
        status: "NEXT",
        date: null,
        progress: "Penerbitan Jaminan Awal",
        sub_progresses: [],
      },
      {
        status: "NEXT",
        date: null,
        progress: "Kasus Ditutup",
        sub_progresses: [],
      },
    ],
  },
];
