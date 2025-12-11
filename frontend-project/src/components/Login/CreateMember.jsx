import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./LoginPage.css";
import Header from "../Header";
import AppFooter from "../AppFooter";

function CreateMember() {

    return(
        <div>
            <Header />
                <div className="login-container-wrapper">
                    <div className="login-box">
                        <h2 className="login-title">회원가입</h2>
                        <form>
                            <div className="input-group">
                                <input placeholder="아이디"/>
                                <input placeholder="비밀번호"/>
                                <input placeholder="비밀번호 확인"/>
                                <input placeholder="등등..."/>
                            </div>
                            <div>
                                <button className="login-button">회원가입</button>
                            </div>
                        </form>
                    </div>
                </div>
            <AppFooter />
        </div>
    )

}

export default CreateMember;