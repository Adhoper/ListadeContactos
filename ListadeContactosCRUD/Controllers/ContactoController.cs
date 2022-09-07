using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ListadeContactosCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace ListadeContactosCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {

        private readonly ListaContactosContext _context;

        public ContactoController(ListaContactosContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            List<Contacto> lista = await _context.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]

        public async Task<IActionResult> Guardar([FromBody] Contacto request)
        {

           await _context.Contactos.AddAsync(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }


        [HttpPut]
        [Route("Editar")]

        public async Task<IActionResult> Editar([FromBody] Contacto request)
        {

            _context.Contactos.Update(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }


        [HttpDelete]
        [Route("Eliminar/{id:int}")]

        public async Task<IActionResult> Eliminar(int id)
        {
            Contacto contacto = _context.Contactos.Find(id);

            _context.Contactos.Remove(contacto);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
