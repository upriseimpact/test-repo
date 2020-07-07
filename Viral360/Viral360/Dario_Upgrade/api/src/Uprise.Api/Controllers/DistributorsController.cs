using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Commands;
using Uprise.Api.Infrastructure.Helpers;

namespace Uprise.Api.Controllers
{
    [Route( "[controller]" )]
    [ApiController]
    public class DistributorsController : ControllerBase
    {
        private readonly UpriseContext _upriseContext;


        public DistributorsController( UpriseContext upriseContext )
        {
            _upriseContext = upriseContext;
        }


        [HttpGet]
        public async Task<JsonResult> Details( int? id )
        {
            var result = new JsonResult( new { success = false, Response = "", Error = "Id is null, please provide it in the request." } );
            if ( id == null )
            {
                return result;
            }
            Distributor distributor = await _upriseContext.Distributor.FindAsync( id );
            if ( distributor == null )
            {
                result = new JsonResult( new { success = false, Response = "", Error = "No distributor associated to this ID." } );
                return result;
            }
            result = new JsonResult( new { success = true, Response = Serializer.DeserializeDistributor( distributor ) } );
            return result;
        }


        [HttpPost]
        public ActionResult Create( Distributor distributor )
        {
            if ( ModelState.IsValid )
            {
                _upriseContext.Distributor.Add( distributor );
                _upriseContext.SaveChanges();
                return new JsonResult( new { success = true, Response = Serializer.DeserializeDistributor( distributor ) } );
            }

            return BadRequest();
        }

        [HttpPut]
        public ActionResult Edit( Distributor distributor )
        {
            if ( ModelState.IsValid )
            {
                _upriseContext.Entry( distributor ).State = EntityState.Modified;
                _upriseContext.SaveChanges();
                return RedirectToAction( "Index" );
            }

            return new JsonResult( new { success = true, Response = Serializer.DeserializeDistributor( distributor ) } );
        }


        [HttpDelete]
        public ActionResult DeleteConfirmed( int id )
        {
            Distributor distributor = _upriseContext.Distributor.Find( id );
            _upriseContext.Distributor.Remove( distributor );
            _upriseContext.SaveChanges();
            return Ok();
        }


        //[HttpGet]
        //public Distributor Get( int id )
        //{
        //    return _upriseContext.Distributor.Find( id );
        //}


        //[HttpPost]
        //public Distributor Create( CreateDistributorCmd cmd )
        //{
        //    var distributor = new Distributor
        //    {
        //        StatusId = cmd.StatusId,
        //        UserId = cmd.UserId,
        //    };

        //    _upriseContext.Distributor.Add( distributor );
        //    _upriseContext.SaveChanges();

        //    return distributor;
        //}


        //[HttpDelete]
        //public bool Delete( int id )
        //{
        //    var distributor = _upriseContext.Distributor.Find( id );
        //    if ( distributor  != null )
        //    {
        //        _upriseContext.Distributor.Remove( distributor );
        //        _upriseContext.SaveChanges();

        //        return true;
        //    }

        //    return false;
        //}


        //[HttpPut]
        //public Distributor Edit( EditDistributorCmd cmd )
        //{
        //    var distributor = Get( cmd.Id );

        //    if ( distributor != null )
        //    {
        //        distributor.StatusId = cmd.StatusId;
        //        _upriseContext.SaveChanges();
        //    }

        //    return distributor;
        //}
    }
}
