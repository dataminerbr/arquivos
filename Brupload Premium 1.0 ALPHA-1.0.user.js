// ==UserScript==
// @name         Brupload Premium 1.0 ALPHA
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redireciona para download gratuito e substitui conteúdo da página
// @match        https://www.brupload.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Função para redirecionar se o botão de download gratuito existir
    function redirectIfButtonExists() {
        const button = document.querySelector('input[type="submit"][id="method_free"][name="method_free"][value="Download Gratuito >>"]');

        if (button) {
            const urlParts = window.location.pathname.split('/');
            const id = urlParts[urlParts.length - 1];
            const newUrl = `https://www.brupload.net/?op=download2&id=${id}&method_free=Download Gratuito >>`;
            window.location.href = newUrl;
        } else {
            // Se o botão não estiver presente, continuar verificando
            requestAnimationFrame(redirectIfButtonExists);
        }
    }

function replaceContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const newContent = `
    <div class="rightcol" bis_skin_checked="1">
        <div class="lft downseclft" bis_skin_checked="1">
            <!-- Family-safe ads -->
        </div>
        <div class="rgt downsecrgt" bis_skin_checked="1"></div>
        <center></center>
        <div id="commonId" class="col-12 lft" bis_skin_checked="1">
            <center>
                <button id="downloadbtn" class="downloadbtn">
                    <span class="bicon">
                        <img class="vanb" src="https://www.brupload.net/images/ico_down.png">
                    </span>
                    <span class="btext">Criar Link de Download</span>
                </button>
            </center>
        </div>
    </div>`;

    const compareTable = document.querySelector('div.compare_table');
    if (compareTable) {
        compareTable.outerHTML = newContent;

        // Abre em nova aba usando addEventListener
        const btn = document.getElementById('downloadbtn');
        if (btn) {
            btn.addEventListener('click', () => {
                window.open(`http://gerador.dnsep.live/gerador/down.php?url=https://www.brupload.net/${id}`, '_blank');
            });
        }
    }
}


    // Inicia a verificação do botão de download gratuito
    redirectIfButtonExists();

    // Cria um observer para mudanças no DOM
    const observer = new MutationObserver(redirectIfButtonExists);
    observer.observe(document.body, { childList: true, subtree: true });

    // Executa a substituição após o carregamento da página
    window.addEventListener('load', replaceContent);
})();
