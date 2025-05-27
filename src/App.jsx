import React, { useState, useEffect } from 'react';
import { 
  Clock, User, Calendar, Coffee, Car, Save, QrCode, Camera, Plus, Minus, 
  Home, Users, FileText, Settings, CheckCircle, XCircle, Eye, 
  BarChart3, Download, Filter, Search, Menu, X, LogOut, Bell,
  UserCheck, ClipboardList, TrendingUp, AlertTriangle, Calculator,
  DollarSign, MapPin, FileBarChart, CalendarDays, FileSpreadsheet
} from 'lucide-react';

// Colores del tema mejorados
const theme = {
  primary: '#043A08',      // Verde oscuro
  secondary: '#E69C62',    // Naranja
  accent: '#0A6B0F',       // Verde medio
  light: '#F8FAF9',        // Blanco verdoso
  gray: '#6B7280',         // Gris
  success: '#10B981',      // Verde éxito
  warning: '#F59E0B',      // Amarillo advertencia
  error: '#EF4444',        // Rojo error
  blue: '#3B82F6',         // Azul
  purple: '#8B5CF6',       // Morado
  indigo: '#6366F1'        // Índigo
};

// Configuración por defecto mejorada
const configDefaults = {
  horas_jornada_normal: 8,
  valor_hora_normal: 5.50,
  valor_hora_25: 6.88,
  valor_hora_50: 8.25,
  valor_hora_100: 11.00,
  tiempo_lunch_default: 60,
  transporte_default: true,
  valor_transporte_default: 2.50,
  alimentacion_defaults: {
    desayuno: 1,
    almuerzo: 1,
    refrigerio: 0,
    desayuno_reforzado: 0,
    merienda: 0,
    seco: 0
  }
};

// Datos mock mejorados
const empleadosMock = [
  { 
    id: '1', 
    cedula: '1234567890', 
    nombres: 'Juan Carlos', 
    apellidos: 'Pérez González', 
    area: 'Producción', 
    cargo: 'Trabajador Agrícola', 
    jornada_horas: 8,
    estado: 'activo',
    codigo_qr: 'QR001',
    salario_base: 450.00
  },
  { 
    id: '2', 
    cedula: '0987654321', 
    nombres: 'María Elena', 
    apellidos: 'García López', 
    area: 'Administración', 
    cargo: 'Talento Humano', 
    jornada_horas: 8,
    estado: 'activo',
    codigo_qr: 'QR002',
    salario_base: 800.00
  },
  { 
    id: '3', 
    cedula: '1122334455', 
    nombres: 'Carlos Alberto', 
    apellidos: 'Mendoza Silva', 
    area: 'Producción', 
    cargo: 'Trabajador Agrícola', 
    jornada_horas: 6,
    estado: 'activo',
    codigo_qr: 'QR003',
    salario_base: 420.00
  },
];

const registrosMock = [
  {
    id: '1',
    empleado_id: '1',
    fecha: '2025-05-26',
    dia_semana: 'L',
    hora_entrada: '06:30',
    hora_salida: '16:00',
    hr_25: 0,
    hs_50: 2,
    he_100: 0,
    horas_permiso: 0,
    transporte: { activo: true, valor: 2.50, observacion: 'Ruta normal' },
    estado: 'pendiente',
    alimentacion: { desayuno: 1, almuerzo: 1, refrigerio: 1, desayuno_reforzado: 0, merienda: 0, seco: 0 },
    observaciones: 'Normal'
  },
  {
    id: '2',
    empleado_id: '1',
    fecha: '2025-05-25',
    dia_semana: 'D',
    hora_entrada: '06:30',
    hora_salida: '15:30',
    hr_25: 1,
    hs_50: 0,
    he_100: 0,
    horas_permiso: 0,
    transporte: { activo: true, valor: 2.50, observacion: '' },
    estado: 'aprobado',
    alimentacion: { desayuno: 1, almuerzo: 1, refrigerio: 0, desayuno_reforzado: 0, merienda: 0, seco: 0 },
    observaciones: ''
  },
  {
    id: '3',
    empleado_id: '2',
    fecha: '2025-05-26',
    dia_semana: 'L',
    hora_entrada: '08:00',
    hora_salida: '17:00',
    hr_25: 1,
    hs_50: 0,
    he_100: 0,
    horas_permiso: 0,
    transporte: { activo: false, valor: 0, observacion: 'Vehículo propio' },
    estado: 'aprobado',
    alimentacion: { desayuno: 1, almuerzo: 1, refrigerio: 0, desayuno_reforzado: 0, merienda: 1, seco: 0 },
    observaciones: ''
  }
];

const usuarioActual = {
  id: '1',
  nombre: 'Administrador Sistema',
  rol: 'administrador',
  email: 'admin@hojaverde.com'
};

// Componente de Layout mejorado
const Layout = ({ children, currentView, setCurrentView, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: theme.primary },
    { id: 'registro', label: 'Registro Asistencia', icon: ClipboardList, color: theme.blue },
    { id: 'empleados', label: 'Empleados', icon: Users, color: theme.purple },
    { id: 'consulta', label: 'Consulta Personal', icon: Eye, color: theme.indigo },
    { id: 'aprobaciones', label: 'Aprobaciones', icon: CheckCircle, color: theme.warning },
    { id: 'reportes', label: 'Reportes', icon: FileText, color: theme.secondary },
    { id: 'configuracion', label: 'Configuración', icon: Settings, color: theme.gray },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar mejorado */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 shadow-2xl`} style={{ backgroundColor: theme.primary }}>
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r" 
             style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})` }}>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
              <span className="text-lg font-bold" style={{ color: theme.primary }}>H</span>
            </div>
            <h1 className="text-white font-bold text-lg">SCAH Hojaverde</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-4 text-left transition-all duration-200 ${
                  currentView === item.id 
                    ? 'bg-white bg-opacity-15 text-white border-r-4 shadow-lg transform scale-105' 
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white hover:transform hover:scale-105'
                }`}
                style={currentView === item.id ? { borderRightColor: theme.secondary } : {}}
              >
                <div className={`p-2 rounded-lg mr-3 ${currentView === item.id ? 'bg-white bg-opacity-20' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 w-full p-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
            <div className="flex items-center text-white">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <User size={20} />
              </div>
              <div className="text-sm">
                <p className="font-medium">{usuarioActual.nombre}</p>
                <p className="text-xs opacity-75 capitalize">{usuarioActual.rol}</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center py-3 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200">
            <LogOut size={16} className="mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar mejorado */}
        <div className="bg-white shadow-sm border-b border-gray-200 backdrop-blur-sm bg-white bg-opacity-95">
          <div className="flex items-center justify-between h-16 px-6">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: theme.primary }}>
                  {new Date().toLocaleDateString('es-EC', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-xs" style={{ color: theme.gray }}>
                  {new Date().toLocaleTimeString('es-EC')}
                </p>
              </div>
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell size={20} style={{ color: theme.gray }} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Dashboard mejorado con estadísticas en tiempo real
const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: 'Empleados Activos',
      value: '298',
      change: '+5 este mes',
      icon: Users,
      color: theme.primary,
      trend: 'up'
    },
    {
      title: 'Asistencia Hoy',
      value: '94%',
      change: '+2% vs ayer',
      icon: UserCheck,
      color: theme.success,
      trend: 'up'
    },
    {
      title: 'Horas Extras Semana',
      value: '156h',
      change: '-12h vs sem. anterior',
      icon: Clock,
      color: theme.secondary,
      trend: 'down'
    },
    {
      title: 'Pendientes Aprobación',
      value: '23',
      change: 'Requieren atención',
      icon: AlertTriangle,
      color: theme.warning,
      trend: 'neutral'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
            Dashboard Principal
          </h1>
          <p className="text-gray-600 mt-1">Resumen de actividades del sistema</p>
        </div>
        <div className="text-sm bg-white rounded-lg p-3 shadow-sm border" style={{ color: theme.gray }}>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Actualizado: {new Date().toLocaleTimeString('es-EC')}
          </div>
        </div>
      </div>

      {/* Stats Cards mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1" style={{ color: theme.gray }}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
                    {stat.value}
                  </p>
                  <div className="flex items-center">
                    {stat.trend === 'up' && <TrendingUp size={14} className="mr-1 text-green-500" />}
                    {stat.trend === 'down' && <TrendingUp size={14} className="mr-1 text-red-500 transform rotate-180" />}
                    <p className="text-sm" style={{ color: stat.color }}>
                      {stat.change}
                    </p>
                  </div>
                </div>
                <div 
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon size={28} style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sección de acciones rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.primary }}>
            <Clock className="mr-2" size={24} />
            Registros de Hoy
          </h3>
          <div className="space-y-3">
            {registrosMock.filter(r => r.fecha === '2025-05-26').map((registro) => {
              const empleado = empleadosMock.find(e => e.id === registro.empleado_id);
              return (
                <div key={registro.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {empleado?.nombres.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{empleado?.nombres} {empleado?.apellidos}</p>
                      <p className="text-sm text-gray-600">
                        {registro.hora_entrada} - {registro.hora_salida} | {empleado?.area}
                      </p>
                    </div>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      registro.estado === 'aprobado' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {registro.estado}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.primary }}>
            <BarChart3 className="mr-2" size={24} />
            Resumen Semanal
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Horas Regulares', value: '1,840h', color: theme.primary },
              { label: 'HR 25%', value: '89h', color: theme.success },
              { label: 'HS 50%', value: '45h', color: theme.warning },
              { label: 'HE 100%', value: '12h', color: theme.error }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{item.label}</span>
                <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total Horas</span>
                <span style={{ color: theme.primary }}>1,986h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Registro mejorado con transporte personalizable
const RegistroAsistencia = () => {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [modoEscaneo, setModoEscaneo] = useState(false);
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    dia_semana: '',
    hora_entrada: '',
    hora_salida: '',
    tiempo_lunch: configDefaults.tiempo_lunch_default,
    horas_permiso: 0,
    transporte: {
      activo: configDefaults.transporte_default,
      valor: configDefaults.valor_transporte_default,
      observacion: ''
    },
    observaciones: '',
    alimentacion: { ...configDefaults.alimentacion_defaults }
  });

  const [horasCalculadas, setHorasCalculadas] = useState({
    horas_trabajadas: 0,
    hr_25: 0,
    hs_50: 0,
    he_100: 0,
    valor_total: 0
  });

  // Calcular día de la semana automáticamente
  useEffect(() => {
    if (formData.fecha) {
      const fecha = new Date(formData.fecha);
      const diasMap = ['D', 'L', 'M', 'MI', 'J', 'V', 'S'];
      setFormData(prev => ({
        ...prev,
        dia_semana: diasMap[fecha.getDay()]
      }));
    }
  }, [formData.fecha]);

  // Calcular horas trabajadas automáticamente
  useEffect(() => {
    if (formData.hora_entrada && formData.hora_salida && empleadoSeleccionado) {
      calcularHoras();
    }
  }, [formData.hora_entrada, formData.hora_salida, formData.tiempo_lunch, empleadoSeleccionado]);

  const calcularHoras = () => {
    const entrada = new Date(`2000-01-01T${formData.hora_entrada}`);
    let salida = new Date(`2000-01-01T${formData.hora_salida}`);
    
    if (salida <= entrada) {
      salida.setDate(salida.getDate() + 1);
    }
    
    const diferenciaMs = salida - entrada;
    const horasTotales = diferenciaMs / (1000 * 60 * 60);
    const horasConLunch = horasTotales - (formData.tiempo_lunch / 60);
    const horasTrabajadas = Math.max(0, horasConLunch);
    
    const jornadaNormal = empleadoSeleccionado?.jornada_horas || 8;
    const horasExtras = Math.max(0, horasTrabajadas - jornadaNormal);
    
    let hr25 = 0, hs50 = 0, he100 = 0;
    
    if (horasExtras > 0) {
      if (horasExtras <= 2) {
        hr25 = horasExtras;
      } else if (horasExtras <= 4) {
        hr25 = 2;
        hs50 = horasExtras - 2;
      } else {
        hr25 = 2;
        hs50 = 2;
        he100 = horasExtras - 4;
      }
    }

    // Calcular valor monetario
    const valorHorasNormales = (horasTrabajadas - horasExtras) * configDefaults.valor_hora_normal;
    const valorHr25 = hr25 * configDefaults.valor_hora_25;
    const valorHs50 = hs50 * configDefaults.valor_hora_50;
    const valorHe100 = he100 * configDefaults.valor_hora_100;
    const valorTransporte = formData.transporte.activo ? formData.transporte.valor : 0;
    
    const valorTotal = valorHorasNormales + valorHr25 + valorHs50 + valorHe100 + valorTransporte;
    
    setHorasCalculadas({
      horas_trabajadas: horasTrabajadas,
      hr_25: hr25,
      hs_50: hs50,
      he_100: he100,
      valor_total: valorTotal
    });
  };

  const aplicarDefaults = () => {
    setFormData(prev => ({
      ...prev,
      tiempo_lunch: configDefaults.tiempo_lunch_default,
      transporte: {
        activo: configDefaults.transporte_default,
        valor: configDefaults.valor_transporte_default,
        observacion: ''
      },
      alimentacion: { ...configDefaults.alimentacion_defaults }
    }));
  };

  const simularEscaneoQR = () => {
    setModoEscaneo(true);
    setTimeout(() => {
      const empleadoAleatorio = empleadosMock[Math.floor(Math.random() * empleadosMock.length)];
      setEmpleadoSeleccionado(empleadoAleatorio);
      setModoEscaneo(false);
    }, 2000);
  };

  const guardarRegistro = () => {
    if (!empleadoSeleccionado || !formData.hora_entrada || !formData.hora_salida) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    alert('¡Registro guardado exitosamente!');
    
    // Limpiar formulario
    setEmpleadoSeleccionado(null);
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      dia_semana: '',
      hora_entrada: '',
      hora_salida: '',
      tiempo_lunch: configDefaults.tiempo_lunch_default,
      horas_permiso: 0,
      transporte: {
        activo: configDefaults.transporte_default,
        valor: configDefaults.valor_transporte_default,
        observacion: ''
      },
      observaciones: '',
      alimentacion: { ...configDefaults.alimentacion_defaults }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            Registro de Asistencia
          </h1>
          <p className="text-gray-600 mt-1">Registre la asistencia diaria de los empleados</p>
        </div>
        <button
          onClick={aplicarDefaults}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Settings className="mr-2" size={16} />
          Aplicar Valores por Defecto
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sección principal */}
        <div className="xl:col-span-3 space-y-6">
          {/* Identificación del Empleado */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.primary }}>
              <User className="mr-2" size={24} />
              Identificación del Empleado
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <button
                  onClick={simularEscaneoQR}
                  disabled={modoEscaneo}
                  className={`w-full p-6 border-2 border-dashed rounded-xl text-center transition-all duration-300 ${
                    modoEscaneo 
                      ? 'border-blue-300 bg-blue-50 cursor-not-allowed'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer hover:shadow-md'
                  }`}
                >
                  {modoEscaneo ? (
                    <div className="flex flex-col items-center">
                      <Camera className="animate-pulse mb-3" size={40} style={{ color: theme.blue }} />
                      <span className="font-medium">Escaneando código QR...</span>
                      <div className="w-8 h-1 bg-blue-300 rounded-full mt-2 animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <QrCode className="mb-3" size={40} style={{ color: theme.gray }} />
                      <span className="font-medium">Escanear Código QR</span>
                      <span className="text-sm text-gray-500 mt-1">Clic para simular escaneo</span>
                    </div>
                  )}
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Seleccionar Empleado Manualmente</label>
                <select
                  value={empleadoSeleccionado?.id || ''}
                  onChange={(e) => {
                    const empleado = empleadosMock.find(emp => emp.id === e.target.value);
                    setEmpleadoSeleccionado(empleado);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                >
                  <option value="">Seleccione un empleado</option>
                  {empleadosMock.map(empleado => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.nombres} {empleado.apellidos} - {empleado.cedula}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {empleadoSeleccionado && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
                <h3 className="font-semibold mb-3 text-lg">Información del Empleado</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Nombre:</span>
                    <p className="font-semibold">{empleadoSeleccionado.nombres} {empleadoSeleccionado.apellidos}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Cédula:</span>
                    <p className="font-semibold">{empleadoSeleccionado.cedula}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Área:</span>
                    <p className="font-semibold">{empleadoSeleccionado.area}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Jornada:</span>
                    <p className="font-semibold">{empleadoSeleccionado.jornada_horas}h diarias</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Registro de Horarios */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.primary }}>
              <Clock className="mr-2" size={24} />
              Registro de Horarios y Permisos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Fecha</label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData(prev => ({ ...prev, fecha: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Hora Entrada</label>
                <input
                  type="time"
                  value={formData.hora_entrada}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora_entrada: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Hora Salida</label>
                <input
                  type="time"
                  value={formData.hora_salida}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora_salida: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tiempo Lunch (min)</label>
                <input
                  type="number"
                  value={formData.tiempo_lunch}
                  onChange={(e) => setFormData(prev => ({ ...prev, tiempo_lunch: parseInt(e.target.value) || 0 }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Horas Permiso</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.horas_permiso}
                  onChange={(e) => setFormData(prev => ({ ...prev, horas_permiso: parseFloat(e.target.value) || 0 }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Día de la Semana</label>
                <input
                  type="text"
                  value={formData.dia_semana}
                  readOnly
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-center font-bold"
                />
              </div>
            </div>
          </div>

          {/* Sistema de Transporte Mejorado */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.primary }}>
              <Car className="mr-2" size={24} />
              Sistema de Transporte
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.transporte.activo}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      transporte: { ...prev.transporte, activo: e.target.checked }
                    }))}
                    className="mr-3"
                  />
                  <Car size={20} className="mr-2" style={{ color: theme.blue }} />
                  <span className="font-medium">Usa Transporte de la Empresa</span>
                </label>
              </div>
              
              {formData.transporte.activo && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor Transporte ($)</label>
                    <input
                      type="number"
                      step="0.25"
                      value={formData.transporte.valor}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        transporte: { ...prev.transporte, valor: parseFloat(e.target.value) || 0 }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Observación Transporte</label>
                    <input
                      type="text"
                      value={formData.transporte.observacion}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        transporte: { ...prev.transporte, observacion: e.target.value }
                      }))}
                      placeholder="Ruta, horario especial, etc."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sistema de Alimentación */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.primary }}>
              <Coffee className="mr-2" size={24} />
              Sistema de Alimentación
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'desayuno', label: 'Desayuno (D)', icon: '🍞', color: theme.warning },
                { key: 'desayuno_reforzado', label: 'Desayuno Reforzado (DR)', icon: '🥪', color: theme.secondary },
                { key: 'refrigerio', label: 'Refrigerio (R1)', icon: '🍪', color: theme.blue },
                { key: 'merienda', label: 'Merienda (MR)', icon: '🧃', color: theme.purple },
                { key: 'seco', label: 'Seco (S)', icon: '🥜', color: theme.indigo },
                { key: 'almuerzo', label: 'Almuerzo (A)', icon: '🍽️', color: theme.success }
              ].map(({ key, label, icon, color }) => (
                <div key={key} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        alimentacion: {
                          ...prev.alimentacion,
                          [key]: Math.max(0, prev.alimentacion[key] - 1)
                        }
                      }))}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-4 font-bold text-xl" style={{ color }}>{formData.alimentacion[key]}</span>
                    <button
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        alimentacion: {
                          ...prev.alimentacion,
                          [key]: prev.alimentacion[key] + 1
                        }
                      }))}
                      className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Plus size={16} style={{ color }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observaciones */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.primary }}>
              Observaciones Adicionales
            </h3>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData(prev => ({ ...prev, observaciones: e.target.value }))}
              placeholder="Ingrese observaciones adicionales sobre el día de trabajo..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500 h-24 resize-none"
            />
          </div>
        </div>

        {/* Panel lateral de cálculos */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ color: theme.primary }}>
              <Calculator className="mr-2" size={20} />
              Cálculos Automáticos
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Horas Trabajadas:</span>
                  <span className="font-bold text-lg">{horasCalculadas.horas_trabajadas.toFixed(2)}h</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded bg-green-50">
                  <span className="text-sm">HR 25%:</span>
                  <span className="font-bold text-green-600">{horasCalculadas.hr_25.toFixed(2)}h</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-yellow-50">
                  <span className="text-sm">HS 50%:</span>
                  <span className="font-bold text-yellow-600">{horasCalculadas.hs_50.toFixed(2)}h</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-red-50">
                  <span className="text-sm">HE 100%:</span>
                  <span className="font-bold text-red-600">{horasCalculadas.he_100.toFixed(2)}h</span>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total a Pagar:</span>
                  <span className="font-bold text-xl text-blue-600">${horasCalculadas.valor_total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Día:</span>
                <span className="font-bold text-lg px-3 py-1 bg-gray-100 rounded-full">{formData.dia_semana}</span>
              </div>
              
              {formData.transporte.activo && (
                <div className="p-2 bg-blue-50 rounded text-sm">
                  <div className="flex justify-between">
                    <span>Transporte:</span>
                    <span className="font-bold">${formData.transporte.valor.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={guardarRegistro}
              className="w-full mt-6 flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: theme.primary }}
            >
              <Save className="mr-2" size={20} />
              Guardar Registro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vista de Consulta Personal mejorada
const ConsultaPersonal = () => {
  const [empleadoConsulta, setEmpleadoConsulta] = useState(empleadosMock[0]);
  const [tipoReporte, setTipoReporte] = useState('semanal');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const generarReporteDiario = () => {
    setTipoReporte('diario');
    setMostrarDetalles(true);
  };

  const generarReporteSemanal = () => {
    setTipoReporte('semanal');
    setMostrarDetalles(true);
  };

  const generarReporteMensual = () => {
    setTipoReporte('mensual');
    setMostrarDetalles(true);
  };

  const registrosEmpleado = registrosMock.filter(r => r.empleado_id === empleadoConsulta.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent">
          Consulta Personal de Horas
        </h1>
        <p className="text-gray-600 mt-1">Consulte su información personal de asistencia y horas trabajadas</p>
      </div>

      {/* Selector de empleado y opciones */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Seleccionar Empleado</label>
            <select
              value={empleadoConsulta.id}
              onChange={(e) => {
                const empleado = empleadosMock.find(emp => emp.id === e.target.value);
                setEmpleadoConsulta(empleado);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-indigo-500"
            >
              {empleadosMock.map(empleado => (
                <option key={empleado.id} value={empleado.id}>
                  {empleado.nombres} {empleado.apellidos} - {empleado.cedula}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Fecha de Consulta</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Información del empleado */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4" style={{ color: theme.primary }}>
          Información Personal
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Empleado:</span>
            <p className="font-bold">{empleadoConsulta.nombres} {empleadoConsulta.apellidos}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Cédula:</span>
            <p className="font-bold">{empleadoConsulta.cedula}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Área:</span>
            <p className="font-bold">{empleadoConsulta.area}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Salario Base:</span>
            <p className="font-bold">${empleadoConsulta.salario_base}</p>
          </div>
        </div>
      </div>

      {/* Botones de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={generarReporteDiario}
          className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-3">
            <CalendarDays size={32} style={{ color: theme.blue }} />
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: theme.blue }}>Reporte Diario</h3>
          <p className="text-sm text-gray-600">Ver asistencia del día específico</p>
        </button>

        <button
          onClick={generarReporteSemanal}
          className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-green-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-3">
            <FileBarChart size={32} style={{ color: theme.success }} />
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: theme.success }}>Reporte Semanal</h3>
          <p className="text-sm text-gray-600">Resumen de la semana laboral</p>
        </button>

        <button
          onClick={generarReporteMensual}
          className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-3">
            <FileSpreadsheet size={32} style={{ color: theme.purple }} />
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: theme.purple }}>Reporte Mensual</h3>
          <p className="text-sm text-gray-600">Consolidado mensual completo</p>
        </button>
      </div>

      {/* Resultados de consulta */}
      {mostrarDetalles && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.primary }}>
              {tipoReporte === 'diario' && 'Reporte Diario'}
              {tipoReporte === 'semanal' && 'Reporte Semanal'}
              {tipoReporte === 'mensual' && 'Reporte Mensual'}
            </h2>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Download className="mr-2" size={16} />
                PDF
              </button>
              <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Download className="mr-2" size={16} />
                Excel
              </button>
            </div>
          </div>

          {/* Resumen de horas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800">Horas Regulares</h4>
              <p className="text-2xl font-bold text-blue-600">40.0h</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800">HR 25%</h4>
              <p className="text-2xl font-bold text-green-600">2.0h</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800">HS 50%</h4>
              <p className="text-2xl font-bold text-yellow-600">1.5h</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800">Total a Recibir</h4>
              <p className="text-2xl font-bold text-purple-600">$347.25</p>
            </div>
          </div>

          {/* Tabla de registros */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: theme.light }}>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>Fecha</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>Día</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>Entrada</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>Salida</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>HR 25%</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>HS 50%</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>Transporte</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrosEmpleado.map((registro) => (
                  <tr key={registro.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{new Date(registro.fecha).toLocaleDateString('es-EC')}</td>
                    <td className="px-4 py-3 text-sm font-medium">{registro.dia_semana}</td>
                    <td className="px-4 py-3 text-sm">{registro.hora_entrada}</td>
                    <td className="px-4 py-3 text-sm">{registro.hora_salida}</td>
                    <td className="px-4 py-3 text-sm text-green-600 font-medium">{registro.hr_25}h</td>
                    <td className="px-4 py-3 text-sm text-yellow-600 font-medium">{registro.hs_50}h</td>
                    <td className="px-4 py-3 text-sm">
                      {registro.transporte.activo ? (
                        <span className="flex items-center text-blue-600">
                          <Car size={14} className="mr-1" />
                          ${registro.transporte.valor}
                        </span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        registro.estado === 'aprobado' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {registro.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alimentación del período */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Alimentación del Período</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium">🍞 Desayuno</p>
                <p className="text-lg font-bold text-orange-600">2</p>
              </div>
              <div className="text-center">
                <p className="font-medium">🍽️ Almuerzo</p>
                <p className="text-lg font-bold text-green-600">2</p>
              </div>
              <div className="text-center">
                <p className="font-medium">🍪 Refrigerio</p>
                <p className="text-lg font-bold text-blue-600">1</p>
              </div>
              <div className="text-center">
                <p className="font-medium">🧃 Merienda</p>
                <p className="text-lg font-bold text-purple-600">1</p>
              </div>
              <div className="text-center">
                <p className="font-medium">🥜 Seco</p>
                <p className="text-lg font-bold text-gray-600">0</p>
              </div>
              <div className="text-center">
                <p className="font-medium">🥪 D. Reforzado</p>
                <p className="text-lg font-bold text-red-600">0</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Gestión de Empleados (mantener similar pero con mejoras visuales)
const GestionEmpleados = () => {
  const [empleados, setEmpleados] = useState(empleadosMock);
  const [filtro, setFiltro] = useState('');
  const [areaFiltro, setAreaFiltro] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    area: '',
    cargo: '',
    jornada_horas: 8,
    estado: 'activo',
    salario_base: 450.00
  });

  const empleadosFiltrados = empleados.filter(emp => {
    const coincideTexto = emp.nombres.toLowerCase().includes(filtro.toLowerCase()) ||
                         emp.apellidos.toLowerCase().includes(filtro.toLowerCase()) ||
                         emp.cedula.includes(filtro);
    const coincideArea = areaFiltro === '' || emp.area === areaFiltro;
    return coincideTexto && coincideArea;
  });

  const guardarEmpleado = () => {
    if (empleadoEditando) {
      setEmpleados(prev => prev.map(emp => 
        emp.id === empleadoEditando.id ? { ...nuevoEmpleado, id: empleadoEditando.id } : emp
      ));
    } else {
      const id = (empleados.length + 1).toString();
      setEmpleados(prev => [...prev, { ...nuevoEmpleado, id, codigo_qr: `QR${id.padStart(3, '0')}` }]);
    }
    
    setMostrarFormulario(false);
    setEmpleadoEditando(null);
    setNuevoEmpleado({
      cedula: '',
      nombres: '',
      apellidos: '',
      area: '',
      cargo: '',
      jornada_horas: 8,
      estado: 'activo',
      salario_base: 450.00
    });
  };

  const editarEmpleado = (empleado) => {
    setEmpleadoEditando(empleado);
    setNuevoEmpleado(empleado);
    setMostrarFormulario(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
            Gestión de Empleados
          </h1>
          <p className="text-gray-600 mt-1">Administre la información de todos los empleados</p>
        </div>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="flex items-center px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg"
          style={{ backgroundColor: theme.secondary }}
        >
          <Plus className="mr-2" size={20} />
          Nuevo Empleado
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Users size={24} style={{ color: theme.success }} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{empleados.filter(e => e.estado === 'activo').length}</p>
              <p className="text-sm text-gray-600">Empleados Activos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <MapPin size={24} style={{ color: theme.blue }} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{new Set(empleados.map(e => e.area)).size}</p>
              <p className="text-sm text-gray-600">Áreas de Trabajo</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock size={24} style={{ color: theme.warning }} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{empleados.reduce((sum, e) => sum + e.jornada_horas, 0)}</p>
              <p className="text-sm text-gray-600">Horas Totales/Día</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <DollarSign size={24} style={{ color: theme.purple }} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">${empleados.reduce((sum, e) => sum + e.salario_base, 0).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Nómina Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros mejorados */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Buscar Empleado</label>
            <div className="relative">
              <Search className="absolute left-3 top-3" size={20} style={{ color: theme.gray }} />
              <input
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Nombre, apellido o cédula..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Filtrar por Área</label>
            <select
              value={areaFiltro}
              onChange={(e) => setAreaFiltro(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
            >
              <option value="">Todas las áreas</option>
              {Array.from(new Set(empleados.map(e => e.area))).map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="mr-2" size={20} />
              Exportar Excel
            </button>
          </div>
          
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <QrCode className="mr-2" size={20} />
              Generar QR Masivo
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Empleados mejorada */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: theme.light }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Empleado
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Identificación
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Área & Cargo
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Jornada
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Salario Base
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {empleadosFiltrados.map((empleado) => (
                <tr key={empleado.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {empleado.nombres.charAt(0)}{empleado.apellidos.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {empleado.nombres} {empleado.apellidos}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <QrCode size={14} className="mr-1" />
                          {empleado.codigo_qr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{empleado.cedula}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{empleado.area}</div>
                    <div className="text-sm text-gray-500">{empleado.cargo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <Clock size={14} className="mr-1" />
                      {empleado.jornada_horas}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${empleado.salario_base}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      empleado.estado === 'activo' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {empleado.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editarEmpleado(empleado)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors"
                        title="Editar"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="text-purple-600 hover:text-purple-900 p-2 rounded hover:bg-purple-50 transition-colors"
                        title="Ver QR"
                      >
                        <QrCode size={16} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors"
                        title="Desactivar"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Formulario mejorado */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: theme.primary }}>
              <User className="mr-2" size={24} />
              {empleadoEditando ? 'Editar Empleado' : 'Nuevo Empleado'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Cédula de Identidad</label>
                <input
                  type="text"
                  value={nuevoEmpleado.cedula}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, cedula: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                  placeholder="1234567890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Nombres</label>
                <input
                  type="text"
                  value={nuevoEmpleado.nombres}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, nombres: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                  placeholder="Juan Carlos"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Apellidos</label>
                <input
                  type="text"
                  value={nuevoEmpleado.apellidos}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, apellidos: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                  placeholder="Pérez González"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Área de Trabajo</label>
                <select
                  value={nuevoEmpleado.area}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, area: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                >
                  <option value="">Seleccionar área</option>
                  {['Producción', 'Administración', 'Logística', 'Calidad', 'Mantenimiento'].map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cargo</label>
                <input
                  type="text"
                  value={nuevoEmpleado.cargo}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, cargo: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                  placeholder="Trabajador Agrícola"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Jornada Laboral (horas)</label>
                <input
                  type="number"
                  min="4"
                  max="12"
                  value={nuevoEmpleado.jornada_horas}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, jornada_horas: parseInt(e.target.value) || 8 }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Salario Base ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={nuevoEmpleado.salario_base}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, salario_base: parseFloat(e.target.value) || 450 }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <select
                  value={nuevoEmpleado.estado}
                  onChange={(e) => setNuevoEmpleado(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="vacaciones">Vacaciones</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => {
                  setMostrarFormulario(false);
                  setEmpleadoEditando(null);
                  setNuevoEmpleado({
                    cedula: '',
                    nombres: '',
                    apellidos: '',
                    area: '',
                    cargo: '',
                    jornada_horas: 8,
                    estado: 'activo',
                    salario_base: 450.00
                  });
                }}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEmpleado}
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: theme.primary }}
              >
                {empleadoEditando ? 'Actualizar' : 'Crear'} Empleado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Módulo de Aprobaciones mejorado
const ModuloAprobaciones = () => {
  const [registros, setRegistros] = useState(registrosMock);
  const [filtroEstado, setFiltroEstado] = useState('pendiente');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  const registrosFiltrados = registros.filter(registro => {
    const coincideEstado = filtroEstado === '' || registro.estado === filtroEstado;
    const coincideFecha = filtroFecha === '' || registro.fecha === filtroFecha;
    return coincideEstado && coincideFecha;
  });

  const aprobarRegistro = (id) => {
    setRegistros(prev => prev.map(reg => 
      reg.id === id ? { ...reg, estado: 'aprobado' } : reg
    ));
    alert('Registro aprobado exitosamente');
  };

  const rechazarRegistro = (id) => {
    setRegistros(prev => prev.map(reg => 
      reg.id === id ? { ...reg, estado: 'rechazado' } : reg
    ));
    alert('Registro rechazado');
  };

  const aprobarTodos = () => {
    setRegistros(prev => prev.map(reg => 
      reg.estado === 'pendiente' ? { ...reg, estado: 'aprobado' } : reg
    ));
    alert('Todos los registros pendientes han sido aprobados');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-800 to-yellow-600 bg-clip-text text-transparent">
            Centro de Aprobaciones
          </h1>
          <p className="text-gray-600 mt-1">Revise y apruebe los registros de asistencia</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg p-3 shadow-sm border">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">
                {registros.filter(r => r.estado === 'pendiente').length} pendientes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas de aprobaciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600">{registros.filter(r => r.estado === 'pendiente').length}</p>
            </div>
            <AlertTriangle size={32} className="text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aprobados</p>
              <p className="text-3xl font-bold text-green-600">{registros.filter(r => r.estado === 'aprobado').length}</p>
            </div>
            <CheckCircle size={32} className="text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rechazados</p>
              <p className="text-3xl font-bold text-red-600">{registros.filter(r => r.estado === 'rechazado').length}</p>
            </div>
            <XCircle size={32} className="text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Registros</p>
              <p className="text-3xl font-bold text-blue-600">{registros.length}</p>
            </div>
            <FileText size={32} className="text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filtros mejorados */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Estado del Registro</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-yellow-500"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Fecha Específica</label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-yellow-500"
            />
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={aprobarTodos}
              className="w-full flex items-center justify-center py-3 px-4 text-white rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: theme.success }}
            >
              <CheckCircle className="mr-2" size={20} />
              Aprobar Todos
            </button>
          </div>
          
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="mr-2" size={20} />
              Exportar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Lista de registros para aprobación */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: theme.light }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Empleado
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Fecha & Horario
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Horas Extras
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Transporte
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider" style={{ color: theme.primary }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registrosFiltrados.map((registro) => {
                const empleado = empleadosMock.find(e => e.id === registro.empleado_id);
                return (
                  <tr key={registro.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {empleado?.nombres.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {empleado?.nombres} {empleado?.apellidos}
                          </div>
                          <div className="text-sm text-gray-500">
                            {empleado?.area} - {empleado?.cargo}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(registro.fecha).toLocaleDateString('es-EC')} ({registro.dia_semana})
                      </div>
                      <div className="text-sm text-gray-500">
                        {registro.hora_entrada} - {registro.hora_salida}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {registro.hr_25 > 0 && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            HR 25%: {registro.hr_25}h
                          </span>
                        )}
                        {registro.hs_50 > 0 && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded ml-1">
                            HS 50%: {registro.hs_50}h
                          </span>
                        )}
                        {registro.he_100 > 0 && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded ml-1">
                            HE 100%: {registro.he_100}h
                          </span>
                        )}
                        {registro.hr_25 === 0 && registro.hs_50 === 0 && registro.he_100 === 0 && (
                          <span className="text-sm text-gray-500">Sin horas extras</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registro.transporte.activo ? (
                        <div className="flex items-center text-blue-600">
                          <Car size={16} className="mr-1" />
                          <span className="font-medium">${registro.transporte.valor}</span>
                          {registro.transporte.observacion && (
                            <span className="text-xs text-gray-500 ml-1">({registro.transporte.observacion})</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">No aplica</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        registro.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                        registro.estado === 'rechazado' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {registro.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {registro.estado === 'pendiente' && (
                          <>
                            <button
                              onClick={() => aprobarRegistro(registro.id)}
                              className="text-green-600 hover:text-green-900 p-2 rounded hover:bg-green-50 transition-colors"
                              title="Aprobar"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() => rechazarRegistro(registro.id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors"
                              title="Rechazar"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setRegistroSeleccionado(registro)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors"
                          title="Ver detalles"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalle mejorado */}
      {registroSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: theme.primary }}>
                Detalle Completo del Registro
              </h3>
              <button
                onClick={() => setRegistroSeleccionado(null)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información del empleado */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Información del Empleado</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Empleado:</span>
                    <span>{empleadosMock.find(e => e.id === registroSeleccionado.empleado_id)?.nombres} {empleadosMock.find(e => e.id === registroSeleccionado.empleado_id)?.apellidos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cédula:</span>
                    <span>{empleadosMock.find(e => e.id === registroSeleccionado.empleado_id)?.cedula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Área:</span>
                    <span>{empleadosMock.find(e => e.id === registroSeleccionado.empleado_id)?.area}</span>
                  </div>
                </div>
              </div>

              {/* Información del registro */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Datos del Registro</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Fecha:</span>
                    <span>{new Date(registroSeleccionado.fecha).toLocaleDateString('es-EC')} ({registroSeleccionado.dia_semana})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Horario:</span>
                    <span>{registroSeleccionado.hora_entrada} - {registroSeleccionado.hora_salida}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Estado:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      registroSeleccionado.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                      registroSeleccionado.estado === 'rechazado' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {registroSeleccionado.estado}
                    </span>
                  </div>
                </div>
              </div>

              {/* Horas extras */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Horas Extras</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">HR 25%:</span>
                    <span className="font-bold text-green-600">{registroSeleccionado.hr_25}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">HS 50%:</span>
                    <span className="font-bold text-yellow-600">{registroSeleccionado.hs_50}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">HE 100%:</span>
                    <span className="font-bold text-red-600">{registroSeleccionado.he_100}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Horas Permiso:</span>
                    <span>{registroSeleccionado.horas_permiso}h</span>
                  </div>
                </div>
              </div>

              {/* Transporte */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Transporte</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Usa transporte:</span>
                    <span>{registroSeleccionado.transporte.activo ? 'Sí' : 'No'}</span>
                  </div>
                  {registroSeleccionado.transporte.activo && (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium">Valor:</span>
                        <span className="font-bold">${registroSeleccionado.transporte.valor}</span>
                      </div>
                      {registroSeleccionado.transporte.observacion && (
                        <div className="flex justify-between">
                          <span className="font-medium">Observación:</span>
                          <span>{registroSeleccionado.transporte.observacion}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Alimentación */}
            <div className="mt-6 bg-orange-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Alimentación del Día</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-medium">🍞 D</p>
                  <p className="text-lg font-bold">{registroSeleccionado.alimentacion.desayuno}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">🥪 DR</p>
                  <p className="text-lg font-bold">{registroSeleccionado.alimentacion.desayuno_reforzado}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">🍪 R1</p>
                  <p className="text-lg font-bold">{registroSeleccionado.alimentacion.refrigerio}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">🧃 MR</p>
                  <p className="text-lg font-bold">{registroSeleccionado.alimentacion.merienda}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">🥜 S</p>
                  <p className="text-lg font-bold">{registroSeleccionado.alimentacion.seco}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">🍽️ A</p>
                  <p className="text-lg font-bold">{registroSeleccionado.alimentacion.almuerzo}</p>
                </div>
              </div>
            </div>
            
            {/* Observaciones */}
            {registroSeleccionado.observaciones && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Observaciones</h4>
                <p className="text-sm">{registroSeleccionado.observaciones}</p>
              </div>
            )}
            
            {/* Botones de acción */}
            {registroSeleccionado.estado === 'pendiente' && (
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => {
                    rechazarRegistro(registroSeleccionado.id);
                    setRegistroSeleccionado(null);
                  }}
                  className="flex items-center px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle className="mr-2" size={16} />
                  Rechazar
                </button>
                <button
                  onClick={() => {
                    aprobarRegistro(registroSeleccionado.id);
                    setRegistroSeleccionado(null);
                  }}
                  className="flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: theme.success }}
                >
                  <CheckCircle className="mr-2" size={16} />
                  Aprobar Registro
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Módulo de Reportes mejorado con más opciones
const ModuloReportes = () => {
  const [tipoReporte, setTipoReporte] = useState('semanal');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);
  const [empleadoFiltro, setEmpleadoFiltro] = useState('');
  const [areaFiltro, setAreaFiltro] = useState('');
  const [mostrarReporte, setMostrarReporte] = useState(false);

  const generarReporte = () => {
    setMostrarReporte(true);
    alert(`Generando reporte ${tipoReporte} del ${fechaInicio} al ${fechaFin}`);
  };

  const generarReporteDiario = () => {
    setTipoReporte('diario');
    setFechaFin(fechaInicio);
    setMostrarReporte(true);
  };

  const generarReporteSemanal = () => {
    setTipoReporte('semanal');
    const fecha = new Date(fechaInicio);
    const inicioSemana = new Date(fecha);
    inicioSemana.setDate(fecha.getDate() - fecha.getDay() + 1);
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    
    setFechaInicio(inicioSemana.toISOString().split('T')[0]);
    setFechaFin(finSemana.toISOString().split('T')[0]);
    setMostrarReporte(true);
  };

  const generarReporteMensual = () => {
    setTipoReporte('mensual');
    const fecha = new Date(fechaInicio);
    const inicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const finMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    
    setFechaInicio(inicioMes.toISOString().split('T')[0]);
    setFechaFin(finMes.toISOString().split('T')[0]);
    setMostrarReporte(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-800 to-orange-600 bg-clip-text text-transparent">
          Centro de Reportes
        </h1>
        <p className="text-gray-600 mt-1">Genere reportes detallados de asistencia y horas trabajadas</p>
      </div>

      {/* Botones de acceso rápido a reportes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={generarReporteDiario}
          className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-4">
            <CalendarDays size={48} style={{ color: theme.blue }} />
          </div>
          <h3 className="font-bold text-xl mb-2" style={{ color: theme.blue }}>Reporte Diario</h3>
          <p className="text-sm text-gray-600 mb-4">Generar reporte de asistencia para un día específico</p>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Clock size={14} />
            <span>Generación rápida</span>
          </div>
        </button>

        <button
          onClick={generarReporteSemanal}
          className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-green-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-4">
            <FileBarChart size={48} style={{ color: theme.success }} />
          </div>
          <h3 className="font-bold text-xl mb-2" style={{ color: theme.success }}>Reporte Semanal</h3>
          <p className="text-sm text-gray-600 mb-4">Consolidado semanal con resumen de horas extras</p>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <BarChart3 size={14} />
            <span>Con gráficos</span>
          </div>
        </button>

        <button
          onClick={generarReporteMensual}
          className="p-6 bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-4">
            <FileSpreadsheet size={48} style={{ color: theme.purple }} />
          </div>
          <h3 className="font-bold text-xl mb-2" style={{ color: theme.purple }}>Reporte Mensual</h3>
          <p className="text-sm text-gray-600 mb-4">Reporte completo con cálculos de nómina</p>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <DollarSign size={14} />
            <span>Incluye costos</span>
          </div>
        </button>
      </div>

      {/* Configuración personalizada del reporte */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6" style={{ color: theme.primary }}>
          Configuración Personalizada de Reporte
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Reporte</label>
            <select
              value={tipoReporte}
              onChange={(e) => setTipoReporte(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-orange-500"
            >
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="personalizado">Personalizado</option>
              <option value="nomina">Nómina</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Fecha Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Empleado</label>
            <select
              value={empleadoFiltro}
              onChange={(e) => setEmpleadoFiltro(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-orange-500"
            >
              <option value="">Todos los empleados</option>
              {empleadosMock.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombres} {emp.apellidos}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Área</label>
            <select
              value={areaFiltro}
              onChange={(e) => setAreaFiltro(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-orange-500"
            >
              <option value="">Todas las áreas</option>
              {Array.from(new Set(empleadosMock.map(e => e.area))).map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={generarReporte}
            className="flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105"
            style={{ backgroundColor: theme.primary }}
          >
            <BarChart3 className="mr-2" size={20} />
            Generar Reporte
          </button>
          
          <button
            className="flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: theme.error }}
          >
            <Download className="mr-2" size={20} />
            Exportar PDF
          </button>
          
          <button
            className="flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: theme.success }}
          >
            <Download className="mr-2" size={20} />
            Exportar Excel
          </button>
          
          <button
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="mr-2" size={20} />
            Programar Reporte
          </button>
        </div>
      </div>

      {/* Vista previa del reporte mejorada */}
      {mostrarReporte && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.primary }}>
              Vista Previa - Reporte {tipoReporte.charAt(0).toUpperCase() + tipoReporte.slice(1)}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm" style={{ color: theme.gray }}>
                Período: {new Date(fechaInicio).toLocaleDateString('es-EC')} - {new Date(fechaFin).toLocaleDateString('es-EC')}
              </div>
              <button
                onClick={() => setMostrarReporte(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Resumen ejecutivo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Total Empleados</h4>
              <p className="text-2xl font-bold text-blue-600">{empleadosMock.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Horas Regulares</h4>
              <p className="text-2xl font-bold text-green-600">1,840h</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Horas Extras</h4>
              <p className="text-2xl font-bold text-yellow-600">146h</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Costo Total</h4>
              <p className="text-2xl font-bold text-purple-600">$12,847</p>
            </div>
          </div>

          {/* Tabla de datos del reporte */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr style={{ backgroundColor: theme.light }}>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>Empleado</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>Área</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>Días Trabajados</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>H. Regulares</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>HR 25%</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>HS 50%</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>HE 100%</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>Transporte</th>
                  <th className="border border-gray-300 px-3 py-2 text-xs font-medium" style={{ color: theme.primary }}>Total a Pagar</th>
                </tr>
              </thead>
              <tbody>
                {empleadosMock.map((empleado, index) => (
                  <tr key={empleado.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">{empleado.nombres} {empleado.apellidos}</td>
                    <td className="border border-gray-300 px-3 py-2">{empleado.area}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">22</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">176h</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-green-600 font-medium">8h</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-yellow-600 font-medium">4h</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-red-600 font-medium">2h</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">$55.00</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">$1,247.50</td>
                  </tr>
                ))}
               <tr style={{ backgroundColor: theme.light }}>
                  <td className="border border-gray-300 px-3 py-2 font-bold" colSpan="2">TOTALES</td>
                  <td className="border border-gray-300 px-3 py-2 font-bold text-center">66</td>
                  <td className="border border-gray-300 px-3 py-2 font-bold text-center">528h</td>
                  <td className="border border-gray-300 px-3 py-2 font-bold text-center text-green-600">24h</td>
                  <td className="border border-gray-300 px-3 py-2 font-bold text-center text-yellow-600">12h</td>
                  <td className="border border-gray-300 px-3 py-2 font-bold text-center text-red-600">6h</td>
                  <td className="border border-gray-300 px-3 py-2 font-bold text-center">$165.00</td>
                  <td className="border border-gray-300 px-3 py-2 font-bold text-center">$3,742.50</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Gráficos y estadísticas adicionales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Distribución por Área</h4>
              <div className="space-y-2">
                {Array.from(new Set(empleadosMock.map(e => e.area))).map(area => (
                  <div key={area} className="flex justify-between items-center">
                    <span>{area}</span>
                    <div className="flex items-center">
                      <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${(empleadosMock.filter(e => e.area === area).length / empleadosMock.length) * 100}%`,
                            backgroundColor: theme.primary 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{empleadosMock.filter(e => e.area === area).length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Resumen de Alimentación</h4>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <p className="text-2xl">🍞</p>
                  <p className="font-bold">45</p>
                  <p className="text-xs">Desayunos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl">🍽️</p>
                  <p className="font-bold">66</p>
                  <p className="text-xs">Almuerzos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl">🍪</p>
                  <p className="font-bold">28</p>
                  <p className="text-xs">Refrigerios</p>
                </div>
              </div>
            </div>
          </div>

          {/* Declaración y firmas */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.primary }}>
              Declaración de Conformidad
            </h3>
            <p className="text-sm text-justify mb-6 text-gray-700">
              Los empleados de esta empresa autorizan la modificación de horarios según necesidades de producción, 
              así como la compensación de horas no trabajadas, conforme al Acuerdo Ministerial 77 y al Art. 16 de la 
              Ley Orgánica de Apoyo Humanitario. El pago se realizará según el registro de entrada y salida. 
              Las horas extras fuera de programación requieren autorización previa de la Gerencia.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12">
                  <p className="text-sm font-medium">Firma del Empleado</p>
                  <p className="text-xs text-gray-600">Trabajador</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12">
                  <p className="text-sm font-medium">Revisión Talento Humano</p>
                  <p className="text-xs text-gray-600">María Elena García López</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12">
                  <p className="text-sm font-medium">Autorización Gerencia</p>
                  <p className="text-xs text-gray-600">Gerente General</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Módulo de Configuración mejorado
const ModuloConfiguracion = () => {
  const [configuracion, setConfiguracion] = useState({
    horas_jornada_normal: 8,
    valor_hora_normal: 5.50,
    valor_hora_25: 6.88,
    valor_hora_50: 8.25,
    valor_hora_100: 11.00,
    tiempo_actualizacion_pantalla: 1,
    tiempo_lunch_default: 60,
    transporte_default: true,
    valor_transporte_default: 2.50,
    empresa_nombre: 'Florícola Hoja Verde',
    empresa_ruc: '1234567890001',
    empresa_direccion: 'Av. Principal 123, Quito, Ecuador',
    empresa_telefono: '+593 2 123-4567',
    alimentacion_defaults: {
      desayuno: 1,
      almuerzo: 1,
      refrigerio: 0,
      desayuno_reforzado: 0,
      merienda: 0,
      seco: 0
    }
  });

  const [usuarios, setUsuarios] = useState([
    { id: '1', nombre: 'Admin Sistema', email: 'admin@hojaverde.com', rol: 'administrador', estado: 'activo' },
    { id: '2', nombre: 'María García', email: 'maria.garcia@hojaverde.com', rol: 'talento_humano', estado: 'activo' },
    { id: '3', nombre: 'Carlos Supervisor', email: 'carlos.super@hojaverde.com', rol: 'consulta', estado: 'activo' }
  ]);

  const [mostrarFormUsuario, setMostrarFormUsuario] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    rol: 'consulta',
    password: ''
  });

  const [tabActiva, setTabActiva] = useState('general');

  const guardarConfiguracion = () => {
    alert('Configuración guardada exitosamente');
  };

  const crearUsuario = () => {
    const id = (usuarios.length + 1).toString();
    setUsuarios(prev => [...prev, { ...nuevoUsuario, id, estado: 'activo' }]);
    setMostrarFormUsuario(false);
    setNuevoUsuario({ nombre: '', email: '', rol: 'consulta', password: '' });
    alert('Usuario creado exitosamente');
  };

  const aplicarDefaults = () => {
    alert('Valores por defecto aplicados al sistema');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'empresa', label: 'Empresa', icon: Home },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'defaults', label: 'Valores por Defecto', icon: Calculator }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Configuración del Sistema
        </h1>
        <p className="text-gray-600 mt-1">Configure los parámetros generales del sistema SCAH</p>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTabActiva(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    tabActiva === tab.id
                      ? 'border-gray-800 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab General */}
          {tabActiva === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: theme.primary }}>
                Configuración General del Sistema
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Parámetros Laborales</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Horas Jornada Normal</label>
                    <input
                      type="number"
                      value={configuracion.horas_jornada_normal}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, horas_jornada_normal: parseFloat(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tiempo Lunch Default (minutos)</label>
                    <input
                      type="number"
                      value={configuracion.tiempo_lunch_default}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, tiempo_lunch_default: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Actualización Pantalla (minutos)</label>
                    <input
                      type="number"
                      value={configuracion.tiempo_actualizacion_pantalla}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, tiempo_actualizacion_pantalla: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Valores de Horas ($)</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor Hora Normal</label>
                    <input
                      type="number"
                      step="0.01"
                      value={configuracion.valor_hora_normal}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, valor_hora_normal: parseFloat(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor Hora 25%</label>
                    <input
                      type="number"
                      step="0.01"
                      value={configuracion.valor_hora_25}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, valor_hora_25: parseFloat(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor Hora 50%</label>
                    <input
                      type="number"
                      step="0.01"
                      value={configuracion.valor_hora_50}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, valor_hora_50: parseFloat(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor Hora 100%</label>
                    <input
                      type="number"
                      step="0.01"
                      value={configuracion.valor_hora_100}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, valor_hora_100: parseFloat(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Empresa */}
          {tabActiva === 'empresa' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: theme.primary }}>
                Información de la Empresa
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de la Empresa</label>
                  <input
                    type="text"
                    value={configuracion.empresa_nombre}
                    onChange={(e) => setConfiguracion(prev => ({ ...prev, empresa_nombre: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">RUC</label>
                  <input
                    type="text"
                    value={configuracion.empresa_ruc}
                    onChange={(e) => setConfiguracion(prev => ({ ...prev, empresa_ruc: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Dirección</label>
                  <input
                    type="text"
                    value={configuracion.empresa_direccion}
                    onChange={(e) => setConfiguracion(prev => ({ ...prev, empresa_direccion: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <input
                    type="text"
                    value={configuracion.empresa_telefono}
                    onChange={(e) => setConfiguracion(prev => ({ ...prev, empresa_telefono: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Usuarios */}
          {tabActiva === 'usuarios' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: theme.primary }}>
                  Gestión de Usuarios del Sistema
                </h2>
                <button
                  onClick={() => setMostrarFormUsuario(true)}
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: theme.secondary }}
                >
                  <Plus className="mr-2" size={16} />
                  Nuevo Usuario
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: theme.light }}>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>
                        Usuario
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>
                        Rol
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: theme.primary }}>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                              <User size={16} />
                            </div>
                            <span className="text-sm font-medium">{usuario.nombre}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{usuario.email}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {usuario.rol}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            usuario.estado === 'activo' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {usuario.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                              <Eye size={14} />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                              <XCircle size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Valores por Defecto */}
          {tabActiva === 'defaults' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: theme.primary }}>
                  Valores por Defecto del Sistema
                </h2>
                <button
                  onClick={aplicarDefaults}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="mr-2" size={16} />
                  Aplicar Defaults
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Transporte por Defecto</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={configuracion.transporte_default}
                        onChange={(e) => setConfiguracion(prev => ({ ...prev, transporte_default: e.target.checked }))}
                        className="mr-2"
                      />
                      <span>Activar transporte por defecto</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium mb-2">Valor por Defecto ($)</label>
                      <input
                        type="number"
                        step="0.25"
                        value={configuracion.valor_transporte_default}
                        onChange={(e) => setConfiguracion(prev => ({ ...prev, valor_transporte_default: parseFloat(e.target.value) }))}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Alimentación por Defecto</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'desayuno', label: 'Desayuno' },
                      { key: 'almuerzo', label: 'Almuerzo' },
                      { key: 'refrigerio', label: 'Refrigerio' },
                      { key: 'merienda', label: 'Merienda' },
                      { key: 'seco', label: 'Seco' },
                      { key: 'desayuno_reforzado', label: 'D. Reforzado' }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-1">{label}</label>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={configuracion.alimentacion_defaults[key]}
                          onChange={(e) => setConfiguracion(prev => ({
                            ...prev,
                            alimentacion_defaults: {
                              ...prev.alimentacion_defaults,
                              [key]: parseInt(e.target.value) || 0
                            }
                          }))}
                          className="w-full p-2 border border-gray-300 rounded text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón de guardar */}
          <div className="flex justify-end mt-8 pt-6 border-t">
            <button
              onClick={guardarConfiguracion}
              className="flex items-center px-8 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: theme.primary }}
            >
              <Save className="mr-2" size={20} />
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Modal Nuevo Usuario */}
      {mostrarFormUsuario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.primary }}>
              Crear Nuevo Usuario
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                  placeholder="Juan Pérez"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                  placeholder="juan@hojaverde.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rol de Usuario</label>
                <select
                  value={nuevoUsuario.rol}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, rol: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                >
                  <option value="consulta">Solo Consulta</option>
                  <option value="talento_humano">Talento Humano</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contraseña Temporal</label>
                <input
                  type="password"
                  value={nuevoUsuario.password}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setMostrarFormUsuario(false);
                  setNuevoUsuario({ nombre: '', email: '', rol: 'consulta', password: '' });
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={crearUsuario}
                className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: theme.primary }}
              >
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente Principal mejorado
const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'registro':
        return <RegistroAsistencia />;
      case 'empleados':
        return <GestionEmpleados />;
      case 'consulta':
        return <ConsultaPersonal />;
      case 'aprobaciones':
        return <ModuloAprobaciones />;
      case 'reportes':
        return <ModuloReportes />;
      case 'configuracion':
        return <ModuloConfiguracion />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      {renderView()}
    </Layout>
  );
};

export default App;