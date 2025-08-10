import { Aside, Aside2, ContainerStyle, Header, Main } from "@/Styles/Index"

import type React from "react"

type Props={
    children:React.ReactNode
}


import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaTags, FaShoppingCart, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdCategory, MdAdd, MdOutlineLocalOffer } from "react-icons/md";

export const SideBarMenu = () => {
  return (
    <div className="sidebar-menu" style={{ display: "flex", flexDirection: "column", padding: "1rem", gap: "1rem" }}>
      {/* Dashboard */}
      <Link to="/loja/admin/dashboard" className="menu-item">
        <MdDashboard /> <span>Dashboard</span>
      </Link>

      {/* Produtos */}
      <Link to="/loja/admin/produtos" className="menu-item">
        <FaBoxOpen /> <span>Produtos</span>
      </Link>
      <Link to="/loja/admin/produtos/criar" className="menu-item">
        <MdAdd /> <span>Adicionar Produto</span>
      </Link>
      <Link to="/loja/admin/categorias" className="menu-item">
        <MdCategory /> <span>Categorias</span>
      </Link>

      {/* Cupons */}
      <Link to="/loja/admin/cupons" className="menu-item">
        <FaTags /> <span>Meus Cupons</span>
      </Link>
      <Link to="/loja/admin/cupons/criar" className="menu-item">
        <MdOutlineLocalOffer /> <span>Criar Cupom</span>
      </Link>

      {/* Pedidos */}
      <Link to="/loja/admin/pedidos" className="menu-item">
        <FaShoppingCart /> <span>Pedidos</span>
      </Link>

      {/* Clientes */}
      <Link to="/loja/admin/clientes" className="menu-item">
        <FaUsers /> <span>Clientes</span>
      </Link>

      {/* Configurações */}
      <Link to="/loja/admin/configuracoes" className="menu-item">
        <FaCog /> <span>Configurações</span>
      </Link>

      {/* Sair */}
      <Link to="/logout" className="menu-item" style={{ marginTop: "auto", color: "red" }}>
        <FaSignOutAlt /> <span>Sair</span>
      </Link>
    </div>
  );
};


export const StoreLayout = ({children}:Props)=>{
    return(
    <ContainerStyle>
        <Aside>
            <SideBarMenu/>
        </Aside>
        <Main>
            {children}
        </Main>
        <Aside2>

        </Aside2>
    </ContainerStyle>
    )
}