<template >
    <div>
        <div class="all-sidebar">
            <ul class="menu-sanfona">
                <li tabindex="-1"  >
                    <div class="link-menu pt-4"><i class="far fa-edit"></i> &nbsp; &nbsp; Cadastros &nbsp; <i class="fas fa-caret-down"></i></div>
                    <div class="wrapper-sub">
                        <ul>
                            <li class="link-subMenu">Usuários</li>
                            <li class="link-subMenu">Senhas</li>
                            <li class="link-subMenu">Endereços</li>
                            <li class="link-subMenu">Telefones</li>
                        </ul>
                   </div>

                </li>
                <li tabindex="-1" >
                    <div class="link-menu"><i class="far fa-sticky-note"></i> &nbsp;  &nbsp; Relatórios &nbsp; <i class="fas fa-caret-down "></i></div>
                     <div class="wrapper-sub">
                        <ul>
                            <li class="link-subMenu"> Download </li>
                            <li class="link-subMenu">Upload</li>
                            <li class="link-subMenu">Tráfego</li>
                        </ul>
                    </div>
                </li>
                <li tabindex="-1" >
                    <div class="link-menu"><i class="fas fa-align-left"></i> &nbsp; &nbsp; Gráficos &nbsp; <i class="fas fa-caret-down"></i></div>
                    <div class="wrapper-sub">
                        <ul>
                            <li class="link-subMenu">Gradico 1</li>
                            <li class="link-subMenu">Grafico 2</li>
                            <li class="link-subMenu">Grafico 3</li>
                        </ul>
                    </div>    
                </li>
                <li tabindex="-1" >
                    <div class="link-menu"><i class="far fa-arrow-alt-circle-up"></i> &nbsp; &nbsp; Upload &nbsp; <i class="fas fa-caret-down"></i></div>
                    <div class="wrapper-sub">
                        <ul>
                            <li class="link-subMenu">Arquivos</li>
                            <li class="link-subMenu">Imagens</li>
                            <li class="link-subMenu">Pastas</li>
                        </ul>
                    </div>
                </li>
                <li tabindex="-1" >
                    <div class="link-menu"><i class="far fa-building"></i> &nbsp; &nbsp; Agências &nbsp; <i class="fas fa-caret-down"></i></div>
                    <div class="wrapper-sub">
                        <ul>
                            <li class="link-subMenu">Agencia 1</li>
                            <li class="link-subMenu">Agencia 2</li>
                             <li class="link-subMenu">Agencia 3</li>
                            <li class="link-subMenu">Agencia 4</li>
                            <li class="link-subMenu">Agencia 5</li>
                            <li class="link-subMenu">Agencia 6</li>
                             <li class="link-subMenu">Agencia 7</li>
                            <li class="link-subMenu">Agencia 8</li>
                            <li class="link-subMenu">Agencia 9</li>
                            <li class="link-subMenu">Agencia 10</li>
                             <li class="link-subMenu">Agencia 11</li>
                            <li class="link-subMenu">Agencia 12</li>
                        </ul>
                    </div>
                </li>
            </ul>
          
        
        </div>   
    </div>  
</template>
<script>
export default {
    
}
</script>
<style scoped>
.all-sidebar{
   background-color: rgba(0, 0, 0, .5);
    width: 180px;
    height:calc(100vh - 53px);
    overflow: auto;
   
   
}

::-webkit-scrollbar {
    width: 6px;
    height: 0px;
}

::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}

::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    cursor: pointer
}


.menu-sanfona li ul{
    display:none;
}
.menu-sanfona li:focus ul{
    display:block;
}

.link-menu{
    
    
    list-style-type: none;
     background-color: rgba(0, 0, 0, .2);
    cursor:pointer;
    padding: 10px;
     color: #ccc;
  
}


.link-subMenu{
     padding: 10px 0 10px 20px;
      width: 100%;
      list-style-type: none;
       background-color: rgba(0, 0, 0, .1);
       color: #ccc;
      cursor:pointer;
}
.link-subMenu:hover{
    background: #ffed69;
    color:#222;
}

.wrapper-sub{
    background: #555;
    opacity: .8

}

    

</style>
