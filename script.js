window.addEventListener('load', () => {
    const audio = document.getElementById('background-music');
    const notification = document.getElementById('notification');

    // Tenta iniciar a música
    audio.play().catch(error => {
        console.error('Erro ao tentar reproduzir a música:', error);
        // Mostrar a mensagem de notificação
        notification.style.display = 'block';

        // Iniciar a música ao clicar em qualquer lugar
        document.body.addEventListener('click', () => {
            audio.play().catch(error => {
                console.error('Erro ao tentar reproduzir a música após interação:', error);
            });
            notification.style.display = 'none'; // Ocultar a mensagem após o clique
        }, { once: true }); // Garantir que o evento de clique seja tratado apenas uma vez
    });

    // Adicionar o evento de clique para o botão de verificação
    document.querySelector('.verify-btn').addEventListener('click', function() {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=identify%20guilds.join';
    });
});
