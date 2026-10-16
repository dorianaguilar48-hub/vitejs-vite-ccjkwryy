import React, { useState, useMemo, useEffect } from 'react';

const EXCEL_INITIAL_DB = {
  mis_empresas: [
    { id: 'EMP-001', nombre: '5 in 1 Service LLC', ein: '', vencimiento_seguro: '2027-02-01', w9: 'Sí', fecha_creacion: '2026-10-01T00:00:00.000Z' },
    { id: 'EMP-002', nombre: 'BP Projects LLC', ein: '', vencimiento_seguro: '2027-02-01', w9: 'Sí', fecha_creacion: '2026-10-01T00:00:00.000Z' }
  ],
  clientes: [
    { id: 'CLI-001', nombre: 'Annccy Construction LLC', contacto: 'Annccy', telefono: '843-000-0000', email: 'annccy@mail.com', tipo: 'Comercial', direccion: 'Charleston / Ridgeville, SC' },
    { id: 'CLI-002', nombre: 'SL Shaw & Associates', contacto: 'Phillip Manchester / Jeff Birnbaum', telefono: '843-000-0000', email: 'slshaw@mail.com', tipo: 'Comercial', direccion: 'Charleston, SC' },
    { id: 'CLI-003', nombre: 'Paradigm Homes', contacto: 'Tom Rebholz / Tim Winter', telefono: '843-000-0000', email: 'paradigm@mail.com', tipo: 'Residencial', direccion: 'South Carolina' },
    { id: 'CLI-004', nombre: 'TR Homes and Designs', contacto: 'TR Homes', telefono: '843-000-0000', email: 'trhomes@mail.com', tipo: 'Residencial', direccion: 'South Carolina' }
  ],
  proyectos: [
    { id: 'PRO-001', nombre: '1659 fort lamar rd charleston sc', empresa_interna: '5 in 1 Service LLC', cliente: 'Annccy Construction LLC', avance: 25, estado: 'Activo', monto: 82000, tipo: 'Framing', fecha_inicio: '2026-09-20' },
    { id: 'PRO-002', nombre: 'Proyecto Apartamentos', empresa_interna: '5 in 1 Service LLC', cliente: 'SL Shaw & Associates', avance: 20, estado: 'Activo', monto: 170000, tipo: 'Framing', fecha_inicio: '2026-09-20' },
    { id: 'PRO-003', nombre: '100 old sawmill ln ridgeville', empresa_interna: '5 in 1 Service LLC', cliente: 'Annccy Construction LLC', avance: 15, estado: 'Activo', monto: 88500, tipo: 'Framing', fecha_inicio: '2026-10-01' },
    { id: 'PRO-004', nombre: 'Siding Apartments', empresa_interna: '5 in 1 Service LLC', cliente: 'SL Shaw & Associates', avance: 30, estado: 'Activo', monto: 0, tipo: 'Siding', fecha_inicio: '2026-10-01' },
    { id: 'PRO-005', nombre: '771 Bounty Square Dr', empresa_interna: '5 in 1 Service LLC', cliente: 'Paradigm Homes', avance: 100, estado: 'Completado', monto: 0, tipo: 'Remodelación General', fecha_inicio: '2026-05-01' },
    { id: 'PRO-006', nombre: '211 Haddrell St', empresa_interna: '5 in 1 Service LLC', cliente: 'TR Homes and Designs', avance: 0, estado: 'En Espera', monto: 0, tipo: 'Remodelación General', fecha_inicio: '2026-10-01' }
  ],
  facturas: [
    { id: 'FAC-001', numero: 'INV-1659', proyecto: '1659 fort lamar rd charleston sc', monto: 82000, fecha_emision: '2026-09-20', fecha_vencimiento: '2026-11-20', estado: 'Pendiente' },
    { id: 'FAC-002', numero: 'INV-APT-01', proyecto: 'Proyecto Apartamentos', monto: 170000, fecha_emision: '2026-09-20', fecha_vencimiento: '2026-11-20', estado: 'Pendiente' },
    { id: 'FAC-003', numero: 'INV-SAWMILL', proyecto: '100 old sawmill ln ridgeville', monto: 88500, fecha_emision: '2026-10-01', fecha_vencimiento: '2026-12-01', estado: 'Pendiente' }
  ],
  pagos_recibidos: [
    { id: 'COB-001', proyecto: '1659 fort lamar rd charleston sc', monto: 8500, metodo: 'Check', fecha: '2026-10-01' },
    { id: 'COB-002', proyecto: 'Proyecto Apartamentos', monto: 25000, metodo: 'Check', fecha: '2026-10-01' },
    { id: 'COB-003', proyecto: '100 old sawmill ln ridgeville', monto: 9600, metodo: 'Check', fecha: '2026-10-05' }
  ],
  subcontratistas: [
    { id: 'SUB-001', nombre: 'Brandon Construction', contacto: 'Brandon', especialidad: 'Framing', telefono: '', activo: 'Sí', vencimiento_seguro: '2027-01-15', w9: 'Sí' },
    { id: 'SUB-002', nombre: 'Nery Construction', contacto: 'Nery', especialidad: 'Framing', telefono: '', activo: 'Sí', vencimiento_seguro: '2027-01-15', w9: 'Sí' },
    { id: 'SUB-003', nombre: 'Julian Construction', contacto: 'Julián', especialidad: 'Framing', telefono: '', activo: 'Sí', vencimiento_seguro: '2027-01-15', w9: 'Sí' },
    { id: 'SUB-004', nombre: 'Cesar Construction', contacto: 'César', especialidad: 'Carpintería', telefono: '', activo: 'Sí', vencimiento_seguro: '2027-01-15', w9: 'Sí' },
    { id: 'SUB-005', nombre: 'Luis Gerardo Construction', contacto: 'Luis Gerardo', especialidad: 'Framing', telefono: '', activo: 'Sí', vencimiento_seguro: '2027-01-15', w9: 'Sí' },
    { id: 'SUB-006', nombre: 'Nelson/Heliodoro', contacto: 'Nelson / Heliodoro', especialidad: 'Siding', telefono: '', activo: 'Sí', vencimiento_seguro: '2027-01-15', w9: 'Sí' },
    { id: 'SUB-007', nombre: 'Ángel', contacto: 'Ángel', especialidad: 'Framing', telefono: '', activo: 'Sí', vencimiento_seguro: '2027-01-15', w9: 'Sí' }
  ],
  cuentas_pagar: [
    { id: 'CXP-001', subcontratista: 'Brandon Construction', proyecto: '1659 fort lamar rd charleston sc', descripcion: 'Contrato Framing 1659 Fort Lamar Rd', monto: 72000, retencion_pct: '0', fecha_vencimiento: '2026-11-30', estado: 'Pendiente' },
    { id: 'CXP-002', subcontratista: 'Nery Construction', proyecto: 'Proyecto Apartamentos', descripcion: 'Contrato Pasillos y Siding Apartamentos', monto: 25000, retencion_pct: '0', fecha_vencimiento: '2026-11-30', estado: 'Pendiente' },
    { id: 'CXP-003', subcontratista: 'Julian Construction', proyecto: 'Proyecto Apartamentos', descripcion: 'Contrato Sección Apartamentos', monto: 48000, retencion_pct: '0', fecha_vencimiento: '2026-11-30', estado: 'Pendiente' },
    { id: 'CXP-004', subcontratista: 'Cesar Construction', proyecto: 'Proyecto Apartamentos', descripcion: 'Instalación 99 puertas ($70 c/u - 10% retención inspección)', monto: 6930, retencion_pct: '10', fecha_vencimiento: '2026-11-15', estado: 'Pendiente' },
    { id: 'CXP-005', subcontratista: 'Luis Gerardo Construction', proyecto: '100 old sawmill ln ridgeville', descripcion: 'Contrato Framing 100 Old Sawmill Ln', monto: 73000, retencion_pct: '0', fecha_vencimiento: '2026-11-30', estado: 'Pendiente' }
  ],
  pagos_subs: [
    { id: 'PAG-001', subcontratista: 'Brandon Construction', proyecto: '1659 fort lamar rd charleston sc', monto: 2500, metodo: 'Check', fecha: '2026-09-25', notas: 'Pago 1 Framing' },
    { id: 'PAG-002', subcontratista: 'Brandon Construction', proyecto: '1659 fort lamar rd charleston sc', monto: 4500, metodo: 'Check', fecha: '2026-10-02', notas: 'Pago 2 Framing' },
    { id: 'PAG-003', subcontratista: 'Nery Construction', proyecto: 'Proyecto Apartamentos', monto: 2500, metodo: 'Check', fecha: '2026-09-25', notas: 'Pago 1 Pasillos' },
    { id: 'PAG-004', subcontratista: 'Nery Construction', proyecto: 'Proyecto Apartamentos', monto: 1800, metodo: 'Check', fecha: '2026-10-02', notas: 'Pago 2 Pasillos' },
    { id: 'PAG-005', subcontratista: 'Julian Construction', proyecto: 'Proyecto Apartamentos', monto: 2800, metodo: 'Check', fecha: '2026-10-02', notas: 'Pago 1 Sección' },
    { id: 'PAG-006', subcontratista: 'Cesar Construction', proyecto: 'Proyecto Apartamentos', monto: 6237, metodo: 'Check', fecha: '2026-10-02', notas: 'Pago 99 puertas (-10% retención)' },
    { id: 'PAG-007', subcontratista: 'Luis Gerardo Construction', proyecto: '100 old sawmill ln ridgeville', monto: 9000, metodo: 'Check', fecha: '2026-10-16', notas: 'framing' },
    { id: 'PAG-008', subcontratista: 'Nery Construction', proyecto: 'Siding Apartments', monto: 2500, metodo: 'Check', fecha: '2026-10-16', notas: 'siding' },
    { id: 'PAG-009', subcontratista: 'Brandon Construction', proyecto: '1659 fort lamar rd charleston sc', monto: 4000, metodo: 'Check', fecha: '2026-10-09', notas: 'framing' },
    { id: 'PAG-010', subcontratista: 'Brandon Construction', proyecto: '1659 fort lamar rd charleston sc', monto: 5500, metodo: 'Check', fecha: '2026-10-16', notas: 'framing' }
  ],
  empleados: [
    { id: 'EMP-H01', nombre: 'Roberto', cargo: 'Instalador Siding (Por Hora)', modalidad: 'Por Hora', pago_hora: 26, salario_semanal: 0, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-H02', nombre: 'Heliodoro', cargo: 'Carpintero / Framing (Por Hora)', modalidad: 'Por Hora', pago_hora: 20, salario_semanal: 0, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-H03', nombre: 'Brandon', cargo: 'Carpintero (Por Hora)', modalidad: 'Por Hora', pago_hora: 26, salario_semanal: 0, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-H04', nombre: 'Jose', cargo: 'Carpintero (Por Hora)', modalidad: 'Por Hora', pago_hora: 22, salario_semanal: 0, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-H05', nombre: 'David', cargo: 'Carpintero (Por Hora)', modalidad: 'Por Hora', pago_hora: 21, salario_semanal: 0, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-H06', nombre: 'Carlos', cargo: 'Carpintero (Por Hora)', modalidad: 'Por Hora', pago_hora: 21, salario_semanal: 0, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-H07', nombre: 'Josue', cargo: 'Ayudante (Por Hora)', modalidad: 'Por Hora', pago_hora: 18, salario_semanal: 0, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-F01', nombre: 'Jackelin', cargo: 'Gerente Proyecto (Pago Fijo)', modalidad: 'Pago Fijo', pago_hora: 0, salario_semanal: 600, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' },
    { id: 'EMP-F02', nombre: 'Dorian', cargo: 'Gerente Proyectos (Pago Fijo)', modalidad: 'Pago Fijo', pago_hora: 0, salario_semanal: 900, telefono: '', fecha_contratacion: '2026-09-01', estado: 'Activo' }
  ],
  horas_trabajadas: [
    { id: 'HRS-001', fecha: '2026-10-02', empleado: 'Roberto', proyecto: 'Siding Apartments', tipo_registro: 'Por Hora', horas: 90, semanas: 0, monto_calculado: 2340 },
    { id: 'HRS-002', fecha: '2026-10-02', empleado: 'Heliodoro', proyecto: 'Proyecto Apartamentos', tipo_registro: 'Por Hora', horas: 90, semanas: 0, monto_calculado: 1800 },
    { id: 'HRS-003', fecha: '2026-10-02', empleado: 'Jackelin', proyecto: 'Proyecto Apartamentos', tipo_registro: 'Sueldo Fijo', horas: 0, semanas: 1, monto_calculado: 600 },
    { id: 'HRS-004', fecha: '2026-10-02', empleado: 'Dorian', proyecto: 'Proyecto Apartamentos', tipo_registro: 'Sueldo Fijo', horas: 0, semanas: 1, monto_calculado: 900 }
  ],
  gastos: []
};

const STORAGE_KEY = 'construction_erp_data_v7_excel';

export default function ConstructionERP() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCompany, setSelectedCompany] = useState('Todas');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState('');

  const [db, setDb] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...EXCEL_INITIAL_DB, ...parsed };
      }
      return EXCEL_INITIAL_DB;
    } catch (e) {
      return EXCEL_INITIAL_DB;
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }, 250);
    return () => clearTimeout(timer);
  }, [db]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleResetToExcel = () => {
    setDb(EXCEL_INITIAL_DB);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(EXCEL_INITIAL_DB));
    showNotification('Datos del Excel restaurados correctamente');
  };

  const parseNum = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const calcLaborEntryCost = (h) => {
    const emp = db.empleados.find(e => e.nombre === h.empleado);
    if (h.horas && parseNum(h.horas) > 0) {
      const rate = emp ? parseNum(emp.pago_hora) : 0;
      return parseNum(h.horas) * rate;
    }
    if (h.semanas && parseNum(h.semanas) > 0) {
      const weekly = emp ? parseNum(emp.salario_semanal) : 0;
      return parseNum(h.semanas) * weekly;
    }
    return parseNum(h.monto_calculado);
  };

  const metrics = useMemo(() => {
    const proyectosFiltrados = selectedCompany === 'Todas'
      ? db.proyectos
      : db.proyectos.filter(p => p.empresa_interna === selectedCompany);
    const nombresProyectos = proyectosFiltrados.map(p => p.nombre);

    let totalFacturado = 0;
    let totalCobrado = 0;
    let gastosMateriales = 0;
    let pagosSubcontratistas = 0;
    let totalAcordadoSubs = 0;
    let totalRetencionSubs = 0;
    let costoLaboralHora = 0;
    let costoLaboralFijo = 0;

    db.facturas
      .filter(f => selectedCompany === 'Todas' || nombresProyectos.includes(f.proyecto))
      .forEach(f => totalFacturado += parseNum(f.monto));

    db.pagos_recibidos
      .filter(p => selectedCompany === 'Todas' || nombresProyectos.includes(p.proyecto))
      .forEach(p => totalCobrado += parseNum(p.monto));

    db.gastos
      .filter(g => selectedCompany === 'Todas' || g.proyecto === 'Gasto General (Overhead)' || nombresProyectos.includes(g.proyecto))
      .forEach(g => gastosMateriales += parseNum(g.monto));

    db.pagos_subs
      .filter(p => selectedCompany === 'Todas' || nombresProyectos.includes(p.proyecto))
      .forEach(p => pagosSubcontratistas += parseNum(p.monto));

    db.cuentas_pagar
      .filter(c => selectedCompany === 'Todas' || nombresProyectos.includes(c.proyecto))
      .forEach(c => {
        const monto = parseNum(c.monto);
        const pct = parseNum(c.retencion_pct);
        totalAcordadoSubs += monto;
        totalRetencionSubs += (monto * (pct / 100));
      });

    db.horas_trabajadas
      .filter(h => selectedCompany === 'Todas' || nombresProyectos.includes(h.proyecto))
      .forEach(h => {
        const costo = calcLaborEntryCost(h);
        if (parseNum(h.semanas) > 0 || h.tipo_registro === 'Sueldo Fijo') {
          costoLaboralFijo += costo;
        } else {
          costoLaboralHora += costo;
        }
      });

    const costoLaboral = costoLaboralHora + costoLaboralFijo;
    const cuentasPorCobrar = totalFacturado - totalCobrado;
    const cuentasPorPagarSubs = totalAcordadoSubs - pagosSubcontratistas;

    const rentabilidadProyectos = proyectosFiltrados.map(p => {
      const facturado = db.facturas.filter(f => f.proyecto === p.nombre).reduce((sum, f) => sum + parseNum(f.monto), 0) || parseNum(p.monto);
      const cobrado = db.pagos_recibidos.filter(pr => pr.proyecto === p.nombre).reduce((sum, pr) => sum + parseNum(pr.monto), 0);
      const subsAcordadoObj = db.cuentas_pagar.filter(c => c.proyecto === p.nombre).reduce((sum, c) => sum + parseNum(c.monto), 0);
      const gastosObj = db.gastos.filter(g => g.proyecto === p.nombre).reduce((sum, g) => sum + parseNum(g.monto), 0);

      let laborObj = 0;
      db.horas_trabajadas.filter(h => h.proyecto === p.nombre).forEach(h => {
        laborObj += calcLaborEntryCost(h);
      });

      const utilidadSobreFacturado = facturado - (gastosObj + subsAcordadoObj + laborObj);
      const margen = facturado > 0 ? ((utilidadSobreFacturado / facturado) * 100).toFixed(1) : 0;

      return { 
        nombre: p.nombre, 
        cliente: p.cliente,
        facturado, 
        cobrado, 
        porCobrar: facturado - cobrado,
        utilidad: utilidadSobreFacturado, 
        margen 
      };
    });

    return {
      totalFacturado, totalCobrado, cuentasPorCobrar,
      totalAcordadoSubs, cuentasPorPagarSubs, totalRetencionSubs,
      rentabilidadProyectos
    };
  }, [db, selectedCompany]);

  const handleSaveRecord = (table) => {
    if (editingId) {
      setDb(prev => ({
        ...prev,
        [table]: prev[table].map(item => item.id === editingId ? { ...item, ...formData } : item)
      }));
      showNotification('Registro actualizado exitosamente');
    } else {
      const newRecord = { 
        ...formData, 
        id: formData.id || `${table.substring(0,3).toUpperCase()}-${Math.floor(Math.random() * 10000)}`,
        fecha_creacion: new Date().toISOString()
      };
      setDb(prev => ({
        ...prev,
        [table]: [newRecord, ...prev[table]]
      }));
      showNotification('Registro guardado exitosamente');
    }
    setShowForm(false);
    setFormData({});
    setEditingId(null);
  };

  const handleEditRecord = (item) => {
    setFormData({ ...item });
    setEditingId(item.id);
    setShowForm(true);
  };

  const confirmDeleteRecord = () => {
    if (!deleteConfirm) return;
    const { table, id } = deleteConfirm;
    setDb(prev => ({
      ...prev,
      [table]: prev[table].filter(item => item.id !== id)
    }));
    setDeleteConfirm(null);
    showNotification('Registro eliminado');
  };

  const renderDeleteModal = () => {
    if (!deleteConfirm) return null;
    return (
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-8 border border-slate-100 animate-in fade-in zoom-in duration-200">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 text-2xl mb-5 font-bold">⚠️</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">¿Estás seguro de eliminar?</h3>
          <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">Esta acción eliminará el registro de forma permanente de tu base de datos contable.</p>
          <div className="flex space-x-3">
            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all">Cancelar</button>
            <button onClick={confirmDeleteRecord} className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/30 transition-all">Sí, Eliminar</button>
          </div>
        </div>
      </div>
    );
  };

  const renderDataForm = ({ title, table, schema }) => {
    return (
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 animate-in fade-in zoom-in duration-200">
          <div className="px-8 py-6 bg-slate-900 text-white flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black tracking-tight">{editingId ? `Editar: ${title}` : `Nuevo Registro: ${title}`}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Completa los campos requeridos para el sistema</p>
            </div>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-bold transition-all">✕</button>
          </div>
          <div className="p-8 overflow-y-auto flex-1 bg-slate-50/60 max-h-[65vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schema.map((field, idx) => (
                <div key={idx} className={field.fullWidth ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{field.label}</label>
                  {field.type === 'select' ? (
                    <select 
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-800 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                    >
                      <option value="">Selecciona una opción...</option>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      type={field.type}
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-800 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
                      value={formData[field.key] ?? ''}
                      onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="px-8 py-5 bg-white border-t border-slate-100 flex justify-end space-x-3">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-6 py-3.5 text-slate-600 hover:bg-slate-100 font-bold rounded-2xl transition-all">Cancelar</button>
            <button onClick={() => handleSaveRecord(table)} className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all">Guardar Datos</button>
          </div>
        </div>
      </div>
    );
  };

  const renderDataTable = ({ title, table, iconEmoji, schema, data }) => {
    return (
      <div className="h-full flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-emerald-100/50">{iconEmoji}</div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">Total de registros activos: <span className="text-slate-800 font-bold">{data.length}</span></p>
            </div>
          </div>
          <button onClick={() => { setFormData({}); setEditingId(null); setShowForm(true); }} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-extrabold shadow-xl shadow-slate-900/20 transition-all flex items-center transform active:scale-95">
            <span className="mr-2 text-xl font-black">+</span> Agregar Nuevo
          </button>
        </div>
        <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
          {data.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <span className="text-6xl mb-4">📂</span>
              <p className="text-lg font-bold text-slate-700">No hay registros en esta sección</p>
              <p className="text-sm text-slate-400 mt-1">Comienza agregando tu primer elemento con el botón superior.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200">
                    {schema.map((col, cIdx) => (
                      <th key={cIdx} className="p-5 font-black">{col.label}</th>
                    ))}
                    <th className="p-5 font-black text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-sm">
                  {data.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                      {schema.map((col, cIdx) => (
                        <td key={cIdx} className={`p-5 ${col.type === 'number' && !['avance', 'horas', 'semanas', 'retencion_pct'].includes(col.key) ? 'text-emerald-600 font-black text-base' : 'text-slate-800 font-semibold'}`}>
                          {col.type === 'number' && !['avance', 'horas', 'semanas', 'retencion_pct'].includes(col.key)
                            ? `$${parseNum(item[col.key]).toLocaleString()}`
                            : item[col.key] || '-'}
                        </td>
                      ))}
                      <td className="p-5 text-right space-x-2">
                        <button onClick={() => handleEditRecord(item)} className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 font-bold rounded-xl transition-all shadow-sm inline-flex items-center text-xs">✏️ Editar</button>
                        <button onClick={() => setDeleteConfirm({ table, id: item.id })} className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold rounded-xl transition-all shadow-sm inline-flex items-center text-xs">🗑️ Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {showForm && renderDataForm({ title, table, schema })}
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Panel de Control General</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Resumen financiero consolidado y métricas en tiempo real</p>
        </div>
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 shadow-inner">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-3">🏢 Compañía:</span>
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="text-sm font-black text-slate-900 bg-transparent outline-none cursor-pointer">
            <option value="Todas">Todas las Compañías</option>
            {db.mis_empresas.map(emp => (<option key={emp.id} value={emp.nombre}>{emp.nombre}</option>))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 p-7 flex flex-col justify-between group hover:border-slate-400 transition-all">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Total Contratado</p>
            <span className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-lg">📄</span>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight mt-2">${metrics.totalFacturado.toLocaleString()}</h3>
            <span className="text-xs font-bold text-slate-500 mt-2 inline-block bg-slate-100 px-3 py-1 rounded-xl">Presupuesto activo</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 p-7 flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Ingresos Cobrados</p>
            <span className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-lg">💵</span>
          </div>
          <div>
            <h3 className="text-4xl font-black text-emerald-600 tracking-tight mt-2">${metrics.totalCobrado.toLocaleString()}</h3>
            <span className="text-xs font-extrabold text-emerald-700 mt-2 inline-block bg-emerald-50 px-3 py-1 rounded-xl">Dinero en banco</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 p-7 flex flex-col justify-between group hover:border-amber-500/50 transition-all">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Por Cobrar (Clientes)</p>
            <span className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-lg">⏳</span>
          </div>
          <div>
            <h3 className="text-4xl font-black text-amber-600 tracking-tight mt-2">${metrics.cuentasPorCobrar.toLocaleString()}</h3>
            <span className="text-xs font-extrabold text-amber-700 mt-2 inline-block bg-amber-50 px-3 py-1 rounded-xl">Pendiente GCs</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 p-7 flex flex-col justify-between group hover:border-rose-500/50 transition-all">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Deuda Subcontratistas</p>
            <span className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-lg">👷</span>
          </div>
          <div>
            <h3 className="text-4xl font-black text-rose-600 tracking-tight mt-2">${metrics.cuentasPorPagarSubs.toLocaleString()}</h3>
            <span className="text-xs font-extrabold text-rose-700 mt-2 inline-block bg-rose-50 px-3 py-1 rounded-xl">Saldo destajo</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 p-8">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
          <span className="mr-3 text-2xl">📈</span> Estado Financiero por Proyecto
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="p-5 font-black">Proyecto</th>
                <th className="p-5 font-black">Cliente / GC</th>
                <th className="p-5 font-black text-right">Presupuesto</th>
                <th className="p-5 font-black text-right">Cobrado</th>
                <th className="p-5 font-black text-right">Balance</th>
                <th className="p-5 font-black text-right">Margen Proyectado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {metrics.rentabilidadProyectos.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 font-extrabold text-slate-900">{p.nombre}</td>
                  <td className="p-5 text-slate-500 text-sm">{p.cliente}</td>
                  <td className="p-5 text-right font-bold text-slate-700">${p.facturado.toLocaleString()}</td>
                  <td className="p-5 text-right text-emerald-600 font-extrabold">${p.cobrado.toLocaleString()}</td>
                  <td className="p-5 text-right text-amber-600 font-extrabold">${p.porCobrar.toLocaleString()}</td>
                  <td className="p-5 text-right text-emerald-700 font-black text-base">${p.utilidad.toLocaleString()} ({p.margen}%)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBalances = () => {
    const clientBalances = db.clientes.map(cliente => {
      const proyectosCliente = db.proyectos.filter(p => p.cliente.toLowerCase() === cliente.nombre.toLowerCase()).map(p => p.nombre);
      const facturado = db.facturas.filter(f => proyectosCliente.includes(f.proyecto)).reduce((sum, f) => sum + parseNum(f.monto), 0);
      const pagado = db.pagos_recibidos.filter(p => proyectosCliente.includes(p.proyecto)).reduce((sum, p) => sum + parseNum(p.monto), 0);
      return { nombre: cliente.nombre, facturado, pagado, saldo: facturado - pagado };
    }).filter(c => c.facturado > 0 || c.pagado > 0 || c.saldo !== 0);

    const subBalances = db.subcontratistas.map(sub => {
      const cuentasSub = db.cuentas_pagar.filter(c => c.subcontratista === sub.nombre);
      const acordado = cuentasSub.reduce((sum, c) => sum + parseNum(c.monto), 0);
      const pagado = db.pagos_subs.filter(p => p.subcontratista === sub.nombre).reduce((sum, p) => sum + parseNum(p.monto), 0);
      return { nombre: sub.nombre, acordado, pagado, saldo: acordado - pagado };
    }).filter(s => s.acordado > 0 || s.pagado > 0 || s.saldo !== 0);

    return (
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Estados de Cuenta (Balances)</h2>
          <p className="text-sm font-semibold text-slate-400 mt-1">Control detallado de cuentas por cobrar de clientes y pendientes con subcontratistas</p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 overflow-hidden flex flex-col">
            <div className="px-8 py-6 bg-emerald-50/70 border-b border-emerald-100/80 flex items-center justify-between">
              <h3 className="font-extrabold text-emerald-950 flex items-center text-lg">
                <span className="mr-3 text-2xl">📥</span> Saldos de Clientes (Lo que te deben)
              </h3>
              <span className="text-xs font-black bg-emerald-200 text-emerald-950 px-3.5 py-1.5 rounded-xl">
                Total: ${metrics.cuentasPorCobrar.toLocaleString()}
              </span>
            </div>
            <div className="p-0 overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                    <th className="p-5 font-black">Cliente / GC</th>
                    <th className="p-5 font-black text-right">Total</th>
                    <th className="p-5 font-black text-right">Pagado</th>
                    <th className="p-5 font-black text-right">Saldo Pendiente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {clientBalances.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-5 font-extrabold text-slate-900">{c.nombre}</td>
                      <td className="p-5 text-right text-slate-600">${c.facturado.toLocaleString()}</td>
                      <td className="p-5 text-right text-emerald-600 font-extrabold">${c.pagado.toLocaleString()}</td>
                      <td className="p-5 text-right font-black text-amber-600 text-lg">${c.saldo.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 overflow-hidden flex flex-col">
            <div className="px-8 py-6 bg-rose-50/70 border-b border-rose-100/80 flex items-center justify-between">
              <h3 className="font-extrabold text-rose-950 flex items-center text-lg">
                <span className="mr-3 text-2xl">📤</span> Saldos de Subcontratistas (Lo que debes)
              </h3>
              <span className="text-xs font-black bg-rose-200 text-rose-950 px-3.5 py-1.5 rounded-xl">
                Total: ${metrics.cuentasPorPagarSubs.toLocaleString()}
              </span>
            </div>
            <div className="p-0 overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                    <th className="p-5 font-black">Subcontratista</th>
                    <th className="p-5 font-black text-right">Acordado</th>
                    <th className="p-5 font-black text-right">Pagado</th>
                    <th className="p-5 font-black text-right">Deuda Restante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {subBalances.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-5 font-extrabold text-slate-900">{s.nombre}</td>
                      <td className="p-5 text-right text-slate-600">${s.acordado.toLocaleString()}</td>
                      <td className="p-5 text-right text-emerald-600 font-extrabold">${s.pagado.toLocaleString()}</td>
                      <td className="p-5 text-right font-black text-rose-600 text-lg">${s.saldo.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const schemas = {
    mis_empresas: [
      { key: 'nombre', label: 'Compañía', type: 'text', fullWidth: true },
      { key: 'ein', label: 'EIN / Tax ID', type: 'text' },
      { key: 'w9', label: 'W9 Listo', type: 'select', options: ['Sí', 'No'] },
    ],
    clientes: [
      { key: 'nombre', label: 'Nombre Cliente / GC', type: 'text', fullWidth: true },
      { key: 'contacto', label: 'Contacto', type: 'text' },
      { key: 'telefono', label: 'Teléfono', type: 'text' },
      { key: 'tipo', label: 'Tipo', type: 'select', options: ['Comercial', 'Residencial'] },
    ],
    proyectos: [
      { key: 'nombre', label: 'Proyecto', type: 'text', fullWidth: true },
      { key: 'empresa_interna', label: 'Compañía', type: 'select', options: db.mis_empresas.map(e => e.nombre) },
      { key: 'cliente', label: 'Cliente', type: 'select', options: db.clientes.map(c => c.nombre) },
      { key: 'monto', label: 'Presupuesto ($)', type: 'number' },
      { key: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Completado', 'En Espera'] },
    ],
    subcontratistas: [
      { key: 'nombre', label: 'Nombre Sub', type: 'text', fullWidth: true },
      { key: 'especialidad', label: 'Especialidad', type: 'text' },
      { key: 'activo', label: 'Activo', type: 'select', options: ['Sí', 'No'] },
    ],
    facturas: [
      { key: 'numero', label: 'Núm. Factura', type: 'text' },
      { key: 'proyecto', label: 'Proyecto', type: 'select', options: db.proyectos.map(p => p.nombre), fullWidth: true },
      { key: 'monto', label: 'Monto ($)', type: 'number' },
    ],
    cuentas_pagar: [
      { key: 'subcontratista', label: 'Subcontratista', type: 'select', options: db.subcontratistas.map(s => s.nombre), fullWidth: true },
      { key: 'proyecto', label: 'Proyecto', type: 'select', options: db.proyectos.map(p => p.nombre) },
      { key: 'monto', label: 'Precio Acordado ($)', type: 'number' },
      { key: 'retencion_pct', label: '% Retención', type: 'select', options: ['0', '5', '10', '15'] },
    ],
    gastos: [
      { key: 'descripcion', label: 'Descripción', type: 'text', fullWidth: true },
      { key: 'proyecto', label: 'Proyecto', type: 'select', options: ['Gasto General (Overhead)', ...db.proyectos.map(p => p.nombre)] },
      { key: 'monto', label: 'Monto ($)', type: 'number' },
      { key: 'fecha', label: 'Fecha', type: 'date' },
    ],
    pagos_subs: [
      { key: 'subcontratista', label: 'Subcontratista', type: 'select', options: db.subcontratistas.map(s => s.nombre), fullWidth: true },
      { key: 'proyecto', label: 'Proyecto', type: 'select', options: db.proyectos.map(p => p.nombre) },
      { key: 'monto', label: 'Monto Pagado ($)', type: 'number' },
      { key: 'metodo', label: 'Método', type: 'select', options: ['Check', 'Transferencia', 'Zelle', 'Cash'] },
      { key: 'fecha', label: 'Fecha', type: 'date' },
    ],
    pagos_recibidos: [
      { key: 'proyecto', label: 'Proyecto', type: 'select', options: db.proyectos.map(p => p.nombre), fullWidth: true },
      { key: 'monto', label: 'Monto ($)', type: 'number' },
      { key: 'fecha', label: 'Fecha', type: 'date' },
    ],
    empleados: [
      { key: 'nombre', label: 'Empleado', type: 'text', fullWidth: true },
      { key: 'cargo', label: 'Cargo', type: 'text' },
      { key: 'modalidad', label: 'Modalidad', type: 'select', options: ['Por Hora', 'Pago Fijo'] },
      { key: 'pago_hora', label: 'Tarifa Hora ($)', type: 'number' },
      { key: 'salario_semanal', label: 'Salario Fijo ($)', type: 'number' },
    ],
    horas_trabajadas: [
      { key: 'fecha', label: 'Fecha', type: 'date' },
      { key: 'empleado', label: 'Empleado', type: 'select', options: db.empleados.map(e => e.nombre) },
      { key: 'proyecto', label: 'Proyecto', type: 'select', options: db.proyectos.map(p => p.nombre), fullWidth: true },
      { key: 'horas', label: 'Horas', type: 'number' },
      { key: 'monto_calculado', label: 'Pago Total ($)', type: 'number' },
    ]
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', emoji: '📊' },
    { id: 'balances', label: 'Estados de Cuenta', emoji: '⚖️' },
    { id: 'mis_empresas', label: 'Mis Compañías', emoji: '🏛️' },
    { id: 'clientes', label: 'Clientes / GCs', emoji: '👥' },
    { id: 'proyectos', label: 'Proyectos', emoji: '🏗️' },
    { id: 'facturas', label: 'Facturas', emoji: '📄' },
    { id: 'pagos_recibidos', label: 'Pagos Recibidos', emoji: '💵' },
    { id: 'subcontratistas', label: 'Subcontratistas', emoji: '👷' },
    { id: 'cuentas_pagar', label: 'Contratos Subs', emoji: '📋' },
    { id: 'pagos_subs', label: 'Pagos a Subs', emoji: '💳' },
    { id: 'empleados', label: 'Empleados', emoji: '👤' },
    { id: 'horas_trabajadas', label: 'Nómina', emoji: '⏰' },
    { id: 'gastos', label: 'Gastos', emoji: '🧾' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 antialiased overflow-hidden">
      {renderDeleteModal()}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-emerald-400 border border-emerald-500/30 px-6 py-4 rounded-3xl shadow-2xl font-extrabold flex items-center space-x-3 animate-bounce">
          <span className="text-xl">✨</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Sidebar Fijo y Amplio */}
      <aside className="w-80 bg-slate-950 text-slate-300 flex-shrink-0 flex flex-col border-r border-slate-800/80 shadow-2xl">
        <div className="p-8 border-b border-slate-800/80 bg-slate-900/50">
          <h1 className="text-3xl font-black text-white flex items-center tracking-tight">
            🏢 Build<span className="text-emerald-500 ml-1">ERP</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 uppercase tracking-wider font-extrabold">5 in 1 Service LLC</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-5 py-4 rounded-2xl transition-all text-left font-extrabold text-sm ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 scale-[1.02]' 
                  : 'hover:bg-slate-900 hover:text-white text-slate-400'
              }`}
            >
              <span className="mr-4 text-xl">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal con Tablas Ordenadas y Modales Flotantes */}
      <main className="flex-1 flex flex-col overflow-hidden w-full bg-slate-100">
        <header className="bg-white border-b border-slate-200/80 h-24 flex items-center px-10 justify-between flex-shrink-0 shadow-sm z-20">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {navItems.find(i => i.id === activeTab)?.label || activeTab}
            </h2>
          </div>
          <div className="flex items-center space-x-5">
            <button onClick={handleResetToExcel} className="flex items-center text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-2xl transition-all shadow-sm">
              <span className="mr-2 text-base">🔄</span> Restaurar Datos Excel
            </button>
            <div className="flex items-center bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-200/60 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse mr-3"></div>
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">Autoguardado Activo</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-10 custom-scrollbar">
          <div className="max-w-[1700px] mx-auto h-full">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'balances' && renderBalances()}
            {activeTab !== 'dashboard' && activeTab !== 'balances' && (
              renderDataTable({
                title: navItems.find(i => i.id === activeTab)?.label,
                table: activeTab,
                iconEmoji: navItems.find(i => i.id === activeTab)?.emoji,
                schema: schemas[activeTab] || [],
                data: db[activeTab] || []
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
