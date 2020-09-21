export default {
    "call_config": {
        "request_timeout": 45,
        "request_timeout_timeunit": "SECONDS",
        "reconnect_timeout": 30,
        "reconnect_timeout_timeunit": "SECONDS",
        "call_sdk_app_id": "fb29ba9db5394c08aad95d72e0d845ee"
    },
    "chat_config": {
        "request_timeout": 180,
        "request_timeout_timeunit": "SECONDS",
        "chat_sdk_app_id": "halodoc-stage",
        "chat_sdk_api_url": "https://qiscus-lb.stage.halodoc.com",
        "chat_sdk_mqtt_url": "ssl://qiscus-mqtt.stage.halodoc.com:1885"
    },
    "consultation_configuration": {
        "consultation_timeout_timeunit": "MINUTES",
        "call_config": {
            "request_timeout": 45,
            "request_timeout_timeunit": "SECONDS",
            "reconnect_timeout": 30,
            "reconnect_timeout_timeunit": "SECONDS"
        },
        "feedback_configuration": {
            "scales": [
                {
                    "id": "1",
                    "key": "thumbs_up",
                    "value": "1",
                    "scale": "1",
                    "attributes": null
                },
                {
                    "id": "2",
                    "key": "thumbs_down",
                    "value": "0",
                    "scale": "1",
                    "attributes": [
                        {
                            "id": "unfriendly_doc",
                            "key": "unfriendly_doc",
                            "display_name": {
                                "id": "Dokter tidak ramah",
                                "default": "Doctor is unfriendly"
                            },
                            "display_order": 1,
                            "value": "0",
                            "scale": "1"
                        },
                        {
                            "id": "unsatisfactory_answer",
                            "key": "unsatisfactory_answer",
                            "display_name": {
                                "id": "Jawaban kurang memuaskan",
                                "default": "Not satisfied with answer"
                            },
                            "display_order": 2,
                            "value": "0",
                            "scale": "1"
                        },
                        {
                            "id": "slow_response",
                            "key": "slow_response",
                            "display_name": {
                                "id": "Respon lama",
                                "default": "Slow response"
                            },
                            "display_order": 3,
                            "value": "0",
                            "scale": "1"
                        },
                        {
                            "id": "unstable_connection",
                            "key": "unstable_connection",
                            "display_name": {
                                "id": "Koneksi tidak stabil",
                                "default": "Unstable connection"
                            },
                            "display_order": 4,
                            "value": "0",
                            "scale": "1"
                        },
                        {
                            "id": "irrelevant_medicine_recommended",
                            "key": "irrelevant_medicine_recommended",
                            "display_name": {
                                "id": "Rekomendasi Obat tidak sesuai kondisi",
                                "default": "Medicine Recommendation doesn't match my condition"
                            },
                            "display_order": 5,
                            "value": "0",
                            "scale": "1"
                        },
                        {
                            "id": "other",
                            "key": "other",
                            "display_name": {
                                "id": "Lainnya",
                                "default": "Others"
                            },
                            "display_order": 6,
                            "value": "0",
                            "scale": "1"
                        }
                    ]
                }
            ]
        },
        "cancellation_reasons": [
            {
                "key": "browsing_app",
                "display_order": 0,
                "display_name": {
                    "default": "Just browsing the app",
                    "id": "Hanya melihat-lihat aplikasi"
                }
            },
            {
                "key": "waited_too_long",
                "display_order": 1,
                "display_name": {
                    "default": "Waited too long",
                    "id": "Terlalu lama menunggu"
                }
            },
            {
                "key": "wrong_doctor_selected",
                "display_order": 2,
                "display_name": {
                    "default": "Wrong doctor selected",
                    "id": "Salah memilih dokter"
                }
            },
            {
                "key": "other",
                "display_order": 3,
                "display_name": {
                    "default": "Other",
                    "id": "Lainnya"
                }
            }
        ],
        "consultation_timeout": 60,
        "chat_config": {
            "request_timeout": 180,
            "request_timeout_timeunit": "SECONDS"
        },
        "tc_configuration": {
            "doctor_sharing_text": {
                "id": "Halo, Aku menemukan #fullName# di Halodoc. Install aplikasi Halodoc sekarang untuk bertanya kepada dokter: #deeplink#",
                "default": "Hey! I found #fullName# on Halodoc. Install the app now to talk: #deeplink#"
            },
            "doctor_category": "d8b7c9e4-bc99-4297-ac15-44a3a51d16a3",
            "no_of_recent_doctors": 3,
            "no_of_category_doctors": 2
        },
        "maximum_user_coupons": 3,
        "consultation_request_values": [
            {
                "display_name": {
                    "default": "Hey <Name>, We are notifying the doctor about your request",
                    "id": "Halo <name>, Kami sudah memberitahu dokter tentang permintaan"
                },
                "start_interval": 180,
                "end_interval": 160
            },
            {
                "display_name": {
                    "default": " We will notify you when the doctor accepts your request",
                    "id": "Kami akan memberitahukan ketika dokter menjawab permintaan kamu"
                },
                "start_interval": 159,
                "end_interval": 120
            },
            {
                "display_name": {
                    "default": "We are waiting for the doctor to accept your request",
                    "id": "Kami menunggu dokter untuk menjawab permintaan kamu"
                },
                "start_interval": 119,
                "end_interval": 80
            },
            {
                "display_name": {
                    "default": "Thanks for your patience, we are waiting for the doctor to accept your request",
                    "id": "Terima kasih untuk kesabarannya, menunggu dokter menjawab permintaan kamu"
                },
                "start_interval": 79,
                "end_interval": 0
            }
        ],
        "payment_configuration": {
            "categories": [
                {
                    "type": "wallet",
                    "instruments": [
                        {
                            "type": "wallet",
                            "provider": "halodoc"
                        }
                    ]
                },
                {
                    "type": "gopay",
                    "instruments": [
                        {
                            "type": "gopay",
                            "provider": "midtrans"
                        }
                    ]
                },
                {
                    "type": "card",
                    "instruments": [
                        {
                            "type": "card",
                            "provider": "midtrans"
                        }
                    ]
                }
            ]
        }
    }
}