// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface FormData {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  date: string;
  details: string;
  category: string;
  guests: number;
  consent: boolean;
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    furigana: "",
    email: "",
    phone: "",
    date: "",
    details: "",
    category: "",
    guests: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = event.target;

    if (type === "checkbox" && event.target instanceof HTMLInputElement) {
      // Handle checkboxes
      setFormData((prev) => ({
        ...prev,
        [name]: event.target.checked, // Safe access after type guard
      }));
    } else {
      // Handle other input types
      setFormData((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    }
  };

  const validateField = (name: string, value: string): string | null => {
    const katakanaRegex = /^[ァ-ンヴー\s]*$/; // Katakana and spaces
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Email regex
    const phoneRegex = /^[0-9]{10,15}$/; // Phone number regex (10-15 digits)

    switch (name) {
      case "name":
        if (!value) return "名前を入力してください。";
        break;
      case "furigana":
        if (!value) return "フリガナを入力してください。";
        if (!katakanaRegex.test(value))
          return "フリガナはカタカナで入力してください。";
        break;
      case "email":
        if (!value) return "メールアドレスを入力してください。";
        if (!emailRegex.test(value))
          return "有効なメールアドレスを入力してください。";
        break;
      case "phone":
        if (
          (formData.category === "" || formData.category === "soba") &&
          !value
        )
          return "電話番号を入力してください。";
        if (!phoneRegex.test(value))
          return "有効な電話番号を入力してください。";
        break;
      case "date":
        if (
          (formData.category === "" || formData.category === "soba") &&
          !value
        )
          return "ご来店日を選択してください。";
        break;
      case "details":
        if (!value) return "お問い合わせ内容を入力してください。";
        break;
      case "category":
        if (!value) return "カテゴリーを選択してください。";
        break;
      case "guests":
        if (
          (formData.category === "" || formData.category === "soba") &&
          !value
        )
          return "ご来店人数を入力してください";
        break;
      case "consent":
        if (!value) return "プライバシーポリシーに同意してください。";
        break;
      default:
        return null;
    }
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name as keyof FormData] = error;
      } else {
        // Ensure error is cleared when validation passes
        newErrors[name as keyof FormData] = null;
      }
    });

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => error === null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setFormData({
        name: "",
        furigana: "",
        email: "",
        phone: "",
        date: "",
        details: "",
        category: "",
        guests: "",
        consent: false,
      });
      console.log(formData);
      setErrors({});
    }
  };

  const socials = [
    {
      icon: "/fb.svg",
      link: "https://facebook.com",
    },
    {
      icon: "/line.svg",
      link: "https://line.com",
    },
    {
      icon: "/x.svg",
      link: "https://x.com",
    },
  ];
  return (
    <div
      style={{
        fontFamily: "Noto Serif JP, serif",
        background: "linear-gradient(to bottom, #FDF6E3, #EDE1D5)",
        minHeight: "100vh",
        padding: "20px",
      }}>
      <div>
        <h1
          style={{
            fontSize: "24px",
            color: "#2B2B2B",
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "50px",
            fontWeight: "bold",
          }}>
          ご予約・お問い合わせ
        </h1>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              border: "2px solid #A8A8A8",
              borderRadius: "4px",
              padding: "30px",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
            }}
            className="">
            {/* Radio Buttons */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "28px",
                  color: "#2B2B2B",
                }}>
                お問合せカテゴリー（必須）
              </label>
              <div style={{ display: "flex", gap: "15px" }}>
                <label
                  style={{
                    color: formData.category === "soba" ? "#000" : "#868686",
                    cursor: "pointer",
                  }}>
                  <input
                    type="radio"
                    name="category"
                    value="soba"
                    checked={formData.category === "soba"}
                    onChange={handleInputChange}
                    style={{
                      appearance: "none",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #009624",
                      borderRadius: "50%",
                      background:
                        formData.category === "soba"
                          ? "linear-gradient(to bottom, #A67C52, #6A4534)"
                          : "none",
                      boxShadow:
                        formData.category === "soba"
                          ? "0 0 9px #A5D6A7"
                          : "none",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  />
                  そば打ち体験ご予約
                </label>
                <label
                  style={{
                    color: formData.category === "inquiry" ? "#000" : "#868686",
                    cursor: "pointer",
                  }}>
                  <input
                    type="radio"
                    name="category"
                    value="inquiry"
                    checked={formData.category === "inquiry"}
                    onChange={handleInputChange}
                    style={{
                      appearance: "none",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #009624",
                      borderRadius: "50%",
                      background:
                        formData.category === "inquiry"
                          ? "linear-gradient(to bottom, #A67C52, #6A4534)"
                          : "none",
                      boxShadow:
                        formData.category === "inquiry"
                          ? "0 0 9px #A5D6A7"
                          : "none",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  />
                  お問い合わせ
                </label>
                <label
                  style={{
                    color: formData.category === "other" ? "#000" : "#868686",
                    cursor: "pointer",
                  }}>
                  <input
                    type="radio"
                    name="category"
                    value="other"
                    checked={formData.category === "other"}
                    onChange={handleInputChange}
                    style={{
                      appearance: "none",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #009624",
                      borderRadius: "50%",
                      background:
                        formData.category === "other"
                          ? "linear-gradient(to bottom, #A67C52, #6A4534)"
                          : "none",
                      boxShadow:
                        formData.category === "other"
                          ? "0 0 9px #A5D6A7"
                          : "none",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  />
                  その他（営業等）
                </label>
              </div>
              {errors.category && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errors.category}
                </div>
              )}
            </div>
            {/* Input Fields */}
            {/* Name */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2B2B2B",
                }}>
                名前（必須）
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="例: 山田太郎"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#FDF8EF",
                  border: "1px solid #D8C9A5",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
              {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
            </div>

            {/* Furigana */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2B2B2B",
                }}>
                フリガナ（必須）
              </label>
              <input
                type="text"
                name="furigana"
                value={formData.furigana}
                onChange={handleInputChange}
                placeholder="例: ヤマダタロウ"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#FDF8EF",
                  border: "1px solid #D8C9A5",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
              {errors.furigana && (
                <div style={{ color: "red" }}>{errors.furigana}</div>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2B2B2B",
                }}>
                メールアドレス（必須）
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="例: example@mail.com"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#FDF8EF",
                  border: "1px solid #D8C9A5",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2B2B2B",
                }}>
                電話番号（必須）
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="例: 000-0000-0000"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#FDF8EF",
                  border: "1px solid #D8C9A5",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
              {errors.phone && (
                <div style={{ color: "red" }}>{errors.phone}</div>
              )}
            </div>

            {/* Visit Date */}
            {(formData?.category === "" || formData?.category === "soba") && (
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#2B2B2B",
                  }}>
                  ご来店日（必須）
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#FDF8EF",
                    border: "1px solid #D8C9A5",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                {errors.date && (
                  <div style={{ color: "red" }}>{errors.date}</div>
                )}
              </div>
            )}

            {/* Number of people */}
            {(formData?.category === "" || formData?.category === "soba") && (
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#2B2B2B",
                  }}>
                  ご来店人数（ご予約の方は必須）
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  placeholder="例: 2名"
                  min="0"
                  step="1"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#FDF8EF",
                    border: "1px solid #D8C9A5",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                {errors.guests && (
                  <div style={{ color: "red" }}>{errors.guests}</div>
                )}
              </div>
            )}

            {/* Inquiry Details */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2B2B2B",
                }}>
                お問合せ内容（必須）
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="例: ご質問やリクエストをご記入ください"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#FDF8EF",
                  border: "1px solid #D8C9A5",
                  borderRadius: "4px",
                  fontSize: "14px",
                  minHeight: "80px",
                }}></textarea>
              {errors.details && (
                <div style={{ color: "red" }}>{errors.details}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full items-center gap-[47px] mt-[30px]">
            <div className="text-center">
              <Link
                href={"https://www.nihon-i.jp/site-policy/"}
                className="text-[#0090FF] text-base font-medium underline">
                プライバシーポリシーを確認する
              </Link>
              <div className="">
                <label className="font-semibold text-base text-[#2D2D2D]">
                  プライバシーポリシーに同意します（必須）{" "}
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid #009624",
                      cursor: "pointer",
                    }}
                  />
                </label>
                {errors.consent && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errors.consent}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              style={{
                background: formData.consent === true ? "#A67C52" : "#949494",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
              className="w-48">
              確認
            </button>
            <div className="flex gap-6">
              {socials?.map((item, i) => {
                return (
                  <Link target="_blank" href={item.link} key={i}>
                    <Image src={item.icon} alt="icon" width={32} height={32} />
                  </Link>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
