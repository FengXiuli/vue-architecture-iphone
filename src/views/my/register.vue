<template>
	<div class="m">
		<dl>
             <dt>
                <span></span>
                <span>账号注册</span>
            </dt>
            
            <dd class="ddd">
                <input type="text" placeholder="短信动态码">
            </dd>
            <span class="z-email">免费获取短信动态码</span>
            <dd>
                <input type="text" placeholder="创建密码">
            </dd>
            <dd>
                <input type="text" placeholder="确认密码">
            </dd>
            <dd>
                <div>同意以下协议并注册</div>
            </dd>
        </dl> 
	</div>
	
</template>

<script>
	// import '@/lib/mui/js/mui.min.js'
	// import '@/lib/mui/js/feedback.js'
</script>

<style scoped lang="scss">
        dt {
            height: 80px;
            border-bottom: 1px solid #eef0f1;
            line-height: 80px;
            background: white;
            margin-top: -24px;
            margin-bottom: 20px;
            span:first-child {
                margin-left: 20px;
            }
            span:last-child {
                margin-left: 210px;
            }
        }
        .z-email {
        	display: block;
        	width: 196px;
        	height: 36px;
        	line-height: 30px;
        	font-size: 20px;
        	padding: 5px;
        	background: #ccc;
        	margin-bottom: 5px;
        	margin-top: 5px;
        	margin-left: 20px;
        	border-radius: 10px;
        }
        dd {
            height: 80px;
            border-bottom: 1px solid #eef0f1;
            line-height: 80px;
            background: white;
            margin-left: 0px;
            font-size: 40px;

            input:focus {
            outline: none;
            }
            input {
                height: 56px;
                border: none;
                margin-left: 20px;
                width: 80%;
            }

            div {
                background: #CCC;
                color: white;
                border-radius: 10px;
                width: 80%;
                margin: 20px auto;
                text-align: center;
            }
            
        }
        dd:last-child {
                background: #eef0f1;
            }
</style>