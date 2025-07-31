window.addEventListener('load', () => {

    // --- Carregamento dinâmico das seções ---
    async function carregarSecao(id, arquivo) {
        try {
            const resposta = await fetch(arquivo);
            if (!resposta.ok) throw new Error('Erro ao carregar ' + arquivo);
            const html = await resposta.text();
            document.getElementById(id).innerHTML = html;
        } catch (error) {
            console.error(error);
        }
    }

    async function carregarTodasSecoes() {
        await carregarSecao('hero', 'sections/hero.html');
        await carregarSecao('sobre', 'sections/sobre.html');
        await carregarSecao('habilidades', 'sections/habilidades.html');
        await carregarSecao('projetos', 'sections/projetos.html');
        await carregarSecao('contato', 'sections/contato.html');
    }

    // Carregar as seções
    carregarTodasSecoes();

    // --- Código existente do seu script ---

    const carregandoTela = document.getElementById('carregandoTela');
    const menuMobile = document.getElementById('menuMobile');
    const btnAbrirMenu = document.getElementById('btnAbrirMenu');
    const btnFecharMenu = document.getElementById('btnFecharMenu');
    const btnVoltarTopo = document.getElementById('btnVoltarTopo');

    // Oculta loader
    setTimeout(() => {
        carregandoTela.style.opacity = '0';
        setTimeout(() => carregandoTela.style.display = 'none', 500);
    }, 1000);

    // Menu mobile
    btnAbrirMenu.addEventListener('click', () => {
        menuMobile.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    btnFecharMenu.addEventListener('click', () => {
        menuMobile.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const idAlvo = link.getAttribute('href');
            const destino = document.querySelector(idAlvo);
            if (destino) {
                window.scrollTo({
                    top: destino.offsetTop - 80,
                    behavior: 'smooth',
                });
                menuMobile.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    });

    // Mostrar botão voltar ao topo
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btnVoltarTopo.style.opacity = '1';
            btnVoltarTopo.style.visibility = 'visible';
        } else {
            btnVoltarTopo.style.opacity = '0';
            btnVoltarTopo.style.visibility = 'hidden';
        }
    });

    btnVoltarTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Slide in animado
    const animarAoRolar = () => {
        document.querySelectorAll('.slide-in').forEach(el => {
            const posicao = el.getBoundingClientRect().top;
            const alturaJanela = window.innerHeight;
            if (posicao < alturaJanela - 100) {
                el.style.animation = 'slideIn 0.5s ease-out forwards';
            }
        });
    };
    animarAoRolar();
    window.addEventListener('scroll', animarAoRolar);
});
