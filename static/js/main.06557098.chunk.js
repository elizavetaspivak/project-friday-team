(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{100:function(e,t,r){e.exports={profile:"Profile_profile__2N0Ai"}},101:function(e,t,r){e.exports={rangeBlock:"HW11_rangeBlock__1ZpQs"}},116:function(e,t,r){},117:function(e,t,r){},142:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),s=r(11),c=r.n(s),o=(r(116),r(16)),i=(r(117),r(7)),l=r(181),u=r(187),d=r(184),j=r(178),b=r(37),h=r(14),p=r(17),O=r(186),m=r(183),x={status:!1,error:null},v=function(e){return{type:"APP/SET-STATUS",status:e}},g=function(e){return{type:"APP/SET-ERROR",error:e}},f=r(1);function w(e){return Object(f.jsx)(m.a,Object(i.a)({elevation:6,variant:"filled"},e))}function S(){var e=Object(h.c)((function(e){return e.app.error})),t=Object(h.b)(),r=function(e,r){"clickaway"!==r&&t(g(null))},n=null!=e;return Object(f.jsx)("div",{children:Object(f.jsx)(O.a,{open:n,autoHideDuration:3e3,onClose:r,children:Object(f.jsx)(w,{open:n,onClose:r,severity:"error",autoHideDuration:3e3,children:e})})})}var A=r(41),N=r.n(A),_=r(99),E=r.n(_).a.create({baseURL:"https://neko-back.herokuapp.com/2.0/",withCredentials:!0}),y=function(e,t){return E.post("/auth/register",{email:e,password:t})},C=function(e){return E.post("auth/login",e)},k=function(){return E.delete("auth/me")},B=function(){return E.post("auth/me",{})},I=function(e){return E.post("auth/forgot",{email:e,message:"password recovery link: <a href='https://elizavetaspivak.github.io/project-friday-team#/newpassword/$token$'>link</a>"})},P=function(e,t){return E.post("auth/set-new-password",{password:e,resetPasswordToken:t})},R={isLoggedIn:!1,user:{_id:"",email:"",name:"",publicCardPacksCount:0,created:Date,updated:Date,isAdmin:!1,verified:!1,rememberMe:!1}},T=function(e){return{type:"LOGIN/SET-IS-LOGGED-IN",value:e}},U=function(e){return{type:"LOGIN/SET_USER_DATA",userData:e}};function L(){var e=Object(h.c)((function(e){return e.login.isLoggedIn})),t=Object(h.b)(),r=Object(b.b)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<7&&(t.password="Password must be more than 7 symbols"):t.password="Required",t},onSubmit:function(e){var n;t((n=e,function(e){e(v(!0)),C(n).then((function(t){e(T(!0)),e(U(t.data)),e(v(!1))})).catch((function(t){var r=t.response?t.response.data.error:t.message+", more details in the console";e(g(r)),e(v(!1))}))})),r.resetForm()}});return e?Object(f.jsx)(o.a,{to:"/profile"}):Object(f.jsxs)("div",{className:N.a.login,children:[Object(f.jsxs)("div",{className:N.a.loginBlock,children:[Object(f.jsx)("h1",{children:"It-incubator"}),Object(f.jsx)("h2",{children:"Sign In"}),Object(f.jsx)("div",{className:N.a.form,children:Object(f.jsxs)("form",{onSubmit:r.handleSubmit,children:[Object(f.jsxs)(j.a,{children:[Object(f.jsx)(l.a,Object(i.a)({type:"email",placeholder:"Email"},r.getFieldProps("email"))),r.touched.email&&r.errors.email?Object(f.jsx)("div",{style:{color:"red"},children:r.errors.email}):null,Object(f.jsx)(l.a,Object(i.a)({type:"password",placeholder:"Password"},r.getFieldProps("password"))),r.touched.password&&r.errors.password?Object(f.jsx)("div",{style:{color:"red"},children:r.errors.password}):null,Object(f.jsx)("div",{className:N.a.rememberMe,children:Object(f.jsx)(u.a,{label:"Remember me",control:Object(f.jsx)(d.a,Object(i.a)({},r.getFieldProps("rememberMe")))})})]}),Object(f.jsx)("div",{className:N.a.forgot,children:Object(f.jsx)(p.c,{to:"/recovery",children:"Forgot password?"})}),Object(f.jsx)("div",{className:N.a.loginButton,children:Object(f.jsx)("button",{children:" Login "})})]})}),Object(f.jsxs)("div",{className:N.a.singIn,children:[Object(f.jsx)("p",{children:"Don't have an account?"}),Object(f.jsx)(p.c,{to:"/register",children:"Sign Up"})]})]}),Object(f.jsx)(S,{})]})}var D=r(42),F=r.n(D),W={isRegister:!1},G=function(){var e=Object(h.b)();return Object(h.c)((function(e){return e.register.isRegister}))?Object(f.jsx)(o.a,{to:"/login"}):Object(f.jsxs)("div",{className:F.a.register,children:[Object(f.jsxs)("div",{className:F.a.registerBlock,children:[Object(f.jsx)("h1",{children:"It-incubator"}),Object(f.jsx)("h2",{children:"Sign Up"}),Object(f.jsx)("div",{className:F.a.form,children:Object(f.jsx)(b.a,{initialValues:{email:"",password:"",confirmPassword:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<7&&(t.password="Password too short"):t.password="Required",e.confirmPassword?e.password!=e.confirmPassword&&(t.password="Password don't match"):t.confirmPassword="Required",t},onSubmit:function(t,r){var n,a,s=r.setSubmitting;e((n=t.email,a=t.password,function(e){e(v(!0)),y(n,a).then((function(t){e(v(!1)),e({type:"SET-REGISTER-STATUS",isRegister:!0})})).catch((function(t){t.error?e(g(t.error)):e(g("Some Error! More details in console.")),e(v(!1))}))})),s(!1)},children:function(e){var t=e.values,r=e.errors,n=e.touched,a=e.handleChange,s=e.handleBlur,c=e.handleSubmit,o=e.isSubmitting;return Object(f.jsx)("div",{className:F.a.formInput,children:Object(f.jsxs)("form",{onSubmit:c,children:[Object(f.jsx)(l.a,{type:"email",name:"email",required:!0,id:"standard-required",onChange:a,onBlur:s,value:t.email,placeholder:"Email",helperText:r.email&&n.email?r.email:"Enter email-id"}),Object(f.jsx)(l.a,{id:"password",type:"password",name:"password",onChange:a,onBlur:s,value:t.password,helperText:r.password&&n.password?r.password:"Enter password",placeholder:"Password"}),Object(f.jsx)(l.a,{id:"confirmPassword",type:"password",name:"confirmPassword",onChange:a,onBlur:s,value:t.confirmPassword,placeholder:"Confirm Password",helperText:r.confirmPassword&&n.confirmPassword?r.confirmPassword:"Enter the password again"}),Object(f.jsxs)("div",{className:F.a.buttonBlock,children:[Object(f.jsx)("button",{className:F.a.cancelButton,children:"Cancel"}),Object(f.jsx)("button",{className:F.a.registerButton,type:"submit",disabled:o,children:"Register"})]})]})})}})})]}),Object(f.jsx)(S,{})]})},K=r(100),M=r.n(K);function Z(){var e=Object(h.b)();Object(n.useEffect)((function(){e((function(e){B().then((function(t){e(T(!0)),e(U(t.data))}))}))}),[]);var t=Object(h.c)((function(e){return e.login.user.email}));return Object(h.c)((function(e){return e.login.isLoggedIn}))?Object(f.jsxs)("div",{className:M.a.profile,children:[Object(f.jsx)("h1",{children:"Profile"}),Object(f.jsxs)("div",{children:["Email: ",t]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{onClick:function(){e((function(e){e(v(!0)),k().then((function(t){e(T(!1)),e(v(!1))})).catch((function(t){var r=t.response?t.response.data.error:t.message+", more details in the console";e(g(r)),e(v(!1))}))}))},children:"Sing out"})})]}):Object(f.jsx)(o.a,{to:"/login"})}var V=r(30),H=r.n(V),Q={emailIsSent:!1};function q(){var e=Object(h.b)(),t=Object(h.c)((function(e){return e.passwordRecovery.emailIsSent})),r=Object(b.b)({initialValues:{email:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",t},onSubmit:function(t){var n;e((n=t.email,function(e){e(v(!0)),I(n).then((function(){e({type:"APP/EMAIL-IS-SENT",emailIsSent:!0}),e(v(!1))})).catch((function(t){t.error?e(g(t.error)):e(g("Some Error! More details in console.")),e(v(!1))}))})),r.resetForm()}});return t?Object(f.jsx)(o.a,{to:"/recoveryconfirmation"}):Object(f.jsxs)("div",{className:H.a.recovery,children:[Object(f.jsxs)("div",{className:H.a.recoveryBlock,children:[Object(f.jsx)("h1",{children:"It-incubator"}),Object(f.jsx)("h2",{children:"Forgot password"}),Object(f.jsxs)("form",{onSubmit:r.handleSubmit,children:[Object(f.jsxs)(j.a,{className:H.a.form,children:[Object(f.jsx)(l.a,Object(i.a)({type:"email",placeholder:"Email",helperText:"Enter your email address to receive password recovery instructions "},r.getFieldProps("email"))),r.touched.email&&r.errors.email?Object(f.jsx)("div",{style:{color:"red"},children:r.errors.email}):null,Object(f.jsx)("div",{className:H.a.buttonBlock,children:Object(f.jsx)("button",{className:H.a.recoveryButton,children:"Get Instructions"})})]}),Object(f.jsxs)("div",{className:H.a.navlinkBlock,children:[Object(f.jsx)("div",{children:"Still remember your good old password?"}),Object(f.jsx)(p.c,{className:H.a.navlink,to:"/login",children:"Try logging in"})]})]})]}),Object(f.jsx)(S,{})]})}var Y=r(50),J=r.n(Y),z={passwordSent:!1};function X(){var e=Object(h.b)(),t=Object(o.g)().token,r=Object(h.c)((function(e){return e.newPassword.passwordSent})),n=Object(b.b)({initialValues:{password:""},validate:function(e){var t={};return e.password?/^[A-Z0-9._%+-]/i.test(e.password)||(t.password="Not acceptable"):t.password="Required",t},onSubmit:function(r){e(function(e,t){return function(r){r(v(!0)),P(e,t).then((function(e){r({type:"APP/PASSWORD-SENT",passwordSent:!0}),r(v(!1))})).catch((function(e){e.error?r(g(e.error)):r(g("Some Error! More details in console.")),r(v(!1))}))}}(r.password,t)),n.resetForm()}});return r?Object(f.jsx)(o.a,{to:"/login"}):Object(f.jsx)("div",{className:J.a.newPassword,children:Object(f.jsxs)("div",{className:J.a.newPasswordBlock,children:[Object(f.jsx)("h1",{children:"It-incubator"}),Object(f.jsx)("h2",{children:"Create new password"}),Object(f.jsx)("form",{onSubmit:n.handleSubmit,children:Object(f.jsxs)(j.a,{className:J.a.form,children:[Object(f.jsx)(l.a,Object(i.a)({type:"password",placeholder:"Password",helperText:"Enter the new password and we we'll send you further instructions"},n.getFieldProps("password"))),n.touched.password&&n.errors.password?Object(f.jsx)("div",{style:{color:"red"},children:n.errors.password}):null,Object(f.jsx)("div",{className:J.a.buttonBlock,children:Object(f.jsx)("button",{className:J.a.createButton,children:"Create new password"})})]})})]})})}var $=r(22),ee=r.n($);function te(){return Object(f.jsxs)("div",{className:ee.a.nav,children:[Object(f.jsx)("div",{className:ee.a.item,children:Object(f.jsx)(p.c,{to:"/login",activeClassName:ee.a.active,children:"Login"})}),Object(f.jsx)("div",{className:"".concat(ee.a.item," ").concat(ee.a.active),children:Object(f.jsx)(p.c,{to:"/register",activeClassName:ee.a.active,children:"Register"})}),Object(f.jsx)("div",{className:ee.a.item,children:Object(f.jsx)(p.c,{to:"/profile",activeClassName:ee.a.active,children:"Profile"})}),Object(f.jsx)("div",{className:ee.a.item,children:Object(f.jsx)(p.c,{to:"*",activeClassName:ee.a.active,children:"Error 404"})}),Object(f.jsx)("div",{className:ee.a.item,children:Object(f.jsx)(p.c,{to:"/recovery",activeClassName:ee.a.active,children:"Password Recovery"})}),Object(f.jsx)("div",{className:ee.a.item,children:Object(f.jsx)(p.c,{to:"/newpassword/:token",activeClassName:ee.a.active,children:"Type New Password"})}),Object(f.jsx)("div",{className:ee.a.item,children:Object(f.jsx)(p.c,{to:"/testpage",activeClassName:ee.a.active,children:"Test Page"})})]})}var re=r(28),ne=r(24),ae=r(55),se=r.n(ae),ce=function(e){e.type;var t=e.onChange,r=e.onChangeText,n=e.onKeyPress,a=e.onEnter,s=e.error,c=e.className,o=e.spanClassName,l=Object(ne.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"]),u="".concat(se.a.error," ").concat(o||""),d="".concat(se.a.input," ").concat(s?se.a.errorInput:se.a.superInput," ").concat(c);return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("input",Object(i.a)({type:"text",onChange:function(e){t&&t(e),r&&r(e.currentTarget.value)},onKeyPress:function(e){n&&n(e),a&&"Enter"===e.key&&a()},className:d},l)),s&&Object(f.jsx)("span",{className:u,children:s})]})},oe=r(73),ie=r.n(oe),le=r(74),ue=r.n(le),de=function(e){var t=e.red,r=e.className,n=Object(ne.a)(e,["red","className"]),a="".concat(t?ue.a.red:ue.a.default," ").concat(r);return Object(f.jsx)("button",Object(i.a)({className:a},n))},je=r(75),be=r.n(je),he=function(e){e.type;var t=e.onChange,r=e.onChangeChecked,n=e.className,a=(e.spanClassName,e.children),s=Object(ne.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),c="".concat(be.a.checkbox," ").concat(n||"");return Object(f.jsxs)("label",{children:[Object(f.jsx)("input",Object(i.a)({type:"checkbox",onChange:function(e){t&&t(e),r&&r(e.currentTarget.checked)},className:c},s)),a&&Object(f.jsx)("span",{className:be.a.spanClassName,children:a})]})};var pe=function(){var e=Object(n.useState)(""),t=Object(re.a)(e,2),r=t[0],a=t[1],s=r?"":"error",c=function(){s?alert("\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0441\u0442..."):alert(r)},o=Object(n.useState)(!1),i=Object(re.a)(o,2),l=i[0],u=i[1];return Object(f.jsxs)("div",{children:[Object(f.jsx)("hr",{}),"Super input text, Super button and Super checkbox",Object(f.jsxs)("div",{className:ie.a.column,children:[Object(f.jsx)(ce,{value:r,onChangeText:a,onEnter:c,error:s}),Object(f.jsx)(ce,{className:ie.a.blue}),Object(f.jsx)(de,{children:"default"}),Object(f.jsx)(de,{red:!0,onClick:c,children:"delete "}),Object(f.jsx)(de,{disabled:!0,children:"disabled"}),Object(f.jsx)(he,{checked:l,onChangeChecked:u,children:"some text "}),Object(f.jsx)(he,{checked:l,onChange:function(e){return u(e.currentTarget.checked)}})]}),Object(f.jsx)("hr",{})]})},Oe=r(76),me=r.n(Oe),xe=function(e){e.autoFocus;var t=e.onBlur,r=e.onEnter,a=e.spanProps,s=Object(ne.a)(e,["autoFocus","onBlur","onEnter","spanProps"]),c=Object(n.useState)(!1),o=Object(re.a)(c,2),l=o[0],u=o[1],d=a||{},j=d.children,b=d.onDoubleClick,h=d.className,p=Object(ne.a)(d,["children","onDoubleClick","className"]),O="".concat(me.a.spanText," ").concat(h);return Object(f.jsx)("div",{className:me.a.editableSpan,children:l?Object(f.jsx)(ce,Object(i.a)({autoFocus:!0,onBlur:function(e){u(!1),t&&t(e)},onEnter:function(){u(!1),r&&r()}},s)):Object(f.jsx)("span",Object(i.a)(Object(i.a)({onDoubleClick:function(e){u(!0),b&&b(e)},className:O},p),{},{children:j||s.value}))})};function ve(e,t){var r=JSON.stringify(t);localStorage.setItem(e,r)}ve("test",{x:"A",y:1});var ge=r(77),fe=r.n(ge);var we=function(){var e=Object(n.useState)(""),t=Object(re.a)(e,2),r=t[0],a=t[1];return Object(f.jsxs)("div",{children:[Object(f.jsx)("hr",{}),"Super Editable Span",Object(f.jsx)("div",{className:fe.a.hwsix,children:Object(f.jsx)(xe,{value:r,onChangeText:a,spanProps:{children:r?void 0:"enter text..."}})}),Object(f.jsxs)("div",{className:fe.a.buttons,children:[Object(f.jsx)(de,{onClick:function(){ve("editable-span-value",r)},children:"save"}),Object(f.jsx)(de,{onClick:function(){a(function(e,t){var r=t,n=localStorage.getItem(e);return null!==n&&(r=JSON.parse(n)),r}("editable-span-value",""))},children:"restore"})]}),Object(f.jsx)("hr",{})]})},Se=function(e){var t=e.options,r=e.onChange,n=e.onChangeOption,a=Object(ne.a)(e,["options","onChange","onChangeOption"]),s=t?t.map((function(e,t){return Object(f.jsx)("option",{value:e,children:e},e+"-"+t)})):[];return Object(f.jsx)("select",Object(i.a)(Object(i.a)({onChange:function(e){r&&r(e),n&&n(e.currentTarget.value)}},a),{},{children:s}))},Ae=function(e){e.type;var t=e.name,r=e.options,n=e.value,a=e.onChange,s=e.onChangeOption,c=Object(ne.a)(e,["type","name","options","value","onChange","onChangeOption"]),o=function(e){a&&a(e),s&&s(e.currentTarget.value)},l=r?r.map((function(e,r){return Object(f.jsxs)("label",{children:[Object(f.jsx)("input",Object(i.a)({type:"radio",name:t,checked:e===n,value:e,onChange:o},c)),e]},t+"-"+r)})):[];return Object(f.jsx)(f.Fragment,{children:l})},Ne=r(78),_e=r.n(Ne),Ee=["x","y","z"];var ye=function(){var e=Object(n.useState)(Ee[1]),t=Object(re.a)(e,2),r=t[0],a=t[1];return Object(f.jsxs)("div",{children:[Object(f.jsx)("hr",{}),"Super Select and Super Radio",Object(f.jsx)("div",{className:_e.a.superSelect,children:Object(f.jsx)(Se,{options:Ee,value:r,onChangeOption:a})}),Object(f.jsx)("div",{className:_e.a.superSelect,children:Object(f.jsx)(Ae,{name:"radio",options:Ee,value:r,onChangeOption:a})}),Object(f.jsx)("hr",{})]})},Ce=r(188),ke=r(179),Be=Object(ke.a)({root:{width:300}}),Ie=function(e){e.type,e.onChange,e.onChangeRange,e.className;var t=e.value1,r=e.setValue1,n=(Object(ne.a)(e,["type","onChange","onChangeRange","className","value1","setValue1"]),Be());return Object(f.jsx)("div",{className:n.root,children:Object(f.jsx)(Ce.a,{value:t,onChange:function(e,t){Array.isArray(t)||r(t)},valueLabelDisplay:"auto","aria-labelledby":"non-linear-slider"})})},Pe=Object(ke.a)({root:{width:300}}),Re=function(e){e.onChangeRange,e.value;var t=e.value1,r=e.setValue1,n=e.value2,a=e.setValue2,s=Pe();return Object(f.jsx)("div",{className:s.root,children:Object(f.jsx)(Ce.a,{value:[t,n],onChange:function(e,t){Array.isArray(t)&&(r(t[0]),a(t[1]))},valueLabelDisplay:"auto","aria-labelledby":"range-slider"})})},Te=r(101),Ue=r.n(Te);var Le=function(){var e=Object(n.useState)(0),t=Object(re.a)(e,2),r=t[0],a=t[1],s=Object(n.useState)(100),c=Object(re.a)(s,2),o=c[0],i=c[1];return Object(f.jsxs)("div",{children:[Object(f.jsx)("hr",{}),"Super Range and Super Double Range",Object(f.jsxs)("div",{className:Ue.a.rangeBlock,children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("span",{children:r}),Object(f.jsx)(Ie,{value1:r,setValue1:a})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("span",{children:r}),Object(f.jsx)(Re,{value1:r,setValue1:a,value2:o,setValue2:i}),Object(f.jsx)("span",{children:o})]})]}),Object(f.jsx)("hr",{})]})};function De(){return Object(f.jsxs)("div",{children:[Object(f.jsx)(pe,{}),Object(f.jsx)(we,{}),Object(f.jsx)(ye,{}),Object(f.jsx)(Le,{})]})}var Fe=r(51),We=r.n(Fe);function Ge(){return Object(f.jsx)("div",{className:We.a.errorBlock,children:Object(f.jsxs)("div",{className:We.a.container,children:[Object(f.jsx)("div",{className:We.a.errorText,children:"404"}),Object(f.jsx)("div",{className:We.a.pageNotFound,children:"Page not found"}),Object(f.jsx)(p.b,{className:We.a.link,to:"/login",children:"Go to Login"})]})})}var Ke=r(180);function Me(){return Object(f.jsx)("div",{className:H.a.recovery,children:Object(f.jsxs)("div",{className:H.a.recoveryBlock,children:[Object(f.jsx)("h1",{children:"It-incubator"}),Object(f.jsx)("img",{src:"data:image/png;base64,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",alt:""}),Object(f.jsx)("h2",{children:"Check your Email"}),Object(f.jsx)("div",{children:"We've sent you an email with further instructions"})]})})}var Ze=function(){var e=Object(h.c)((function(e){return e.app.status}));return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(te,{}),e&&Object(f.jsx)(Ke.a,{color:"secondary"}),Object(f.jsxs)(o.d,{children:[Object(f.jsx)(o.b,{path:"/login",component:L}),Object(f.jsx)(o.b,{path:"/register",render:function(){return Object(f.jsx)(G,{})}}),Object(f.jsx)(o.b,{path:"/profile",render:function(){return Object(f.jsx)(Z,{})}}),Object(f.jsx)(o.b,{exact:!0,path:"/recovery",render:function(){return Object(f.jsx)(q,{})}}),Object(f.jsx)(o.b,{exact:!0,path:"/recoveryconfirmation",render:function(){return Object(f.jsx)(Me,{})}}),Object(f.jsx)(o.b,{exact:!0,path:"/newpassword/:token",render:function(){return Object(f.jsx)(X,{})}}),Object(f.jsx)(o.b,{exact:!0,path:"/testpage",render:function(){return Object(f.jsx)(De,{})}}),Object(f.jsx)(o.b,{exact:!0,path:"*",render:function(){return Object(f.jsx)(Ge,{})}})]})]})},Ve=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,189)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;r(e),n(e),a(e),s(e),c(e)}))},He=r(66),Qe=r(102),qe=Object(He.b)({login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN/SET-IS-LOGGED-IN":return Object(i.a)(Object(i.a)({},e),{},{isLoggedIn:t.value});case"LOGIN/SET_USER_DATA":return Object(i.a)(Object(i.a)({},e),{},{user:t.userData});default:return e}},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"":default:return e}},register:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET-REGISTER-STATUS":return Object(i.a)(Object(i.a)({},e),{},{isRegister:t.isRegister});default:return e}},passwordRecovery:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/EMAIL-IS-SENT":return Object(i.a)(Object(i.a)({},e),{},{emailIsSent:t.emailIsSent});default:return e}},newPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/PASSWORD-SENT":return Object(i.a)(Object(i.a)({},e),{},{passwordSent:t.passwordSent});default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-ERROR":return Object(i.a)(Object(i.a)({},e),{},{error:t.error});case"APP/SET-STATUS":return Object(i.a)(Object(i.a)({},e),{},{status:t.status});default:return e}}}),Ye=Object(He.c)(qe,Object(He.a)(Qe.a));window.store=Ye,c.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(p.a,{children:Object(f.jsx)(h.a,{store:Ye,children:Object(f.jsx)(Ze,{})})})}),document.getElementById("root")),Ve()},22:function(e,t,r){e.exports={nav:"Nav_nav__3F7VF",active:"Nav_active__3nWya"}},30:function(e,t,r){e.exports={recovery:"PasswordRecovery_recovery__Ey8U7",recoveryBlock:"PasswordRecovery_recoveryBlock__ODKj4",form:"PasswordRecovery_form__v0mvU",buttonBlock:"PasswordRecovery_buttonBlock__3DU9c",recoveryButton:"PasswordRecovery_recoveryButton__3OWKd",navlinkBlock:"PasswordRecovery_navlinkBlock__2iABt",navlink:"PasswordRecovery_navlink__3Y7Pb"}},41:function(e,t,r){e.exports={login:"Login_login__1lDhE",loginItem:"Login_loginItem__3XXs_",loginBlock:"Login_loginBlock__oe1fJ",form:"Login_form__2U4gu",rememberMe:"Login_rememberMe__1_SBF",forgot:"Login_forgot__3bb6M",loginButton:"Login_loginButton__7or5h",singIn:"Login_singIn__lG5gC"}},42:function(e,t,r){e.exports={register:"Register_register__3wg0X",registerBlock:"Register_registerBlock__3rt27",form:"Register_form__3OA63",formInput:"Register_formInput__3dmpf",buttonBlock:"Register_buttonBlock__2xucS",registerButton:"Register_registerButton__3m1fi",cancelButton:"Register_cancelButton__133z0"}},50:function(e,t,r){e.exports={newPassword:"CreateNewPassword_newPassword__3Z1Oh",newPasswordBlock:"CreateNewPassword_newPasswordBlock__2wijP",form:"CreateNewPassword_form__j-CWA",buttonBlock:"CreateNewPassword_buttonBlock__3rp7t",createButton:"CreateNewPassword_createButton__2OmGc"}},51:function(e,t,r){e.exports={errorBlock:"Error_errorBlock__3-4pW",container:"Error_container__2RlQq",errorText:"Error_errorText__2ozDB",link:"Error_link__2-0kI",pageNotFound:"Error_pageNotFound__SxkAK"}},55:function(e,t,r){e.exports={superInput:"SuperInputText_superInput__16ubX",errorInput:"SuperInputText_errorInput__BJF_v",error:"SuperInputText_error__1L1o7"}},73:function(e,t,r){e.exports={blue:"HW4_blue__3lrwR",column:"HW4_column__nJpV8",testSpanError:"HW4_testSpanError__LvQoI",input:"HW4_input__2rWiu"}},74:function(e,t,r){e.exports={default:"SuperButton_default__2mp23",red:"SuperButton_red__2xpw9"}},75:function(e,t,r){e.exports={checkbox:"SuperCheckbox_checkbox__228w9",spanClassName:"SuperCheckbox_spanClassName__NWHI_"}},76:function(e,t,r){e.exports={editableSpan:"SuperEditableSpan_editableSpan__349Bf",spanText:"SuperEditableSpan_spanText__ZF4uv",className:"SuperEditableSpan_className__2TyxX"}},77:function(e,t,r){e.exports={hwsix:"HW6_hwsix__2aGNO",buttons:"HW6_buttons__3yN2G"}},78:function(e,t,r){e.exports={superSelect:"HW7_superSelect__2wRAY"}}},[[142,1,2]]]);
//# sourceMappingURL=main.06557098.chunk.js.map