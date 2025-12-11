document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const redirectBtn = document.getElementById('redirectBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const message = document.querySelector('.message');
    
    // 设置目标URL（这里使用示例URL，实际使用时可以从URL参数或其他方式获取）
    const targetUrl = getTargetUrl();
    
    // 设置自动跳转计时器（3秒后自动跳转）
    let countdown = 3;
    let redirectTimer;
    
    // 更新倒计时显示
    function updateCountdown() {
        message.textContent = `您即将离开本页面，前往新的目的地 (${countdown}秒后自动跳转)`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(redirectTimer);
            redirectToTarget();
        }
    }
    
    // 跳转到目标页面
    function redirectToTarget() {
        window.location.href = targetUrl;
    }
    
    // 取消跳转
    function cancelRedirect() {
        // 清除计时器
        clearInterval(redirectTimer);
        
        // 更新页面内容
        message.textContent = "跳转已取消";
        redirectBtn.style.display = 'none';
        cancelBtn.textContent = '返回';
        cancelBtn.onclick = function() {
            window.history.back();
        };
    }
    
    // 获取目标URL
    function getTargetUrl() {
        // 尝试从URL参数获取目标URL
        const urlParams = new URLSearchParams(window.location.search);
        const url = urlParams.get('url');
        
        // 如果URL参数存在，使用它；否则使用默认URL
        return url || 'https://1word.pages.dev/';
    }
    
    // 事件监听
    redirectBtn.addEventListener('click', function() {
        clearInterval(redirectTimer);
        redirectToTarget();
    });
    cancelBtn.addEventListener('click', cancelRedirect);
    
    // 启动倒计时
    updateCountdown();
    redirectTimer = setInterval(updateCountdown, 1000);
});